##############################################
# $Id: 02_FHEMAPP.pm 1 2023-01-08 10:18:00Z jemu75 $#
package FHEM::FHEMAPP;

use strict;
use warnings;
use HttpUtils;

use MIME::Base64;

use Data::Dumper;

use GPUtils qw(:all);

use File::Temp qw(tempfile tempdir);
#$dir = File::Temp->newdir();

#https://www.perl-howto.de/2008/07/temporare-dateien-sicher-erzeugen.html
#https://metacpan.org/release/TJENNESS/File-Temp-0.22/view/Temp.pm#OBJECT-ORIENTED_INTERFACE


#########################################################################
# Importing/Exporting Functions and variables from/to main
#########################################################################
BEGIN {
	GP_Import(qw(
		defs
		AttrVal
		ReadingsVal
		InternalVal
		Log3
		fhem
		readingFnAttributes
		readingsSingleUpdate
		readingsBeginUpdate
		readingsBulkUpdateIfChanged
		readingsBulkUpdate
		readingsEndUpdate
		readingsDelete
		init_done
		FW_CSRF
		FW_confdir
		CommandAttr
		CommandDeleteAttr
		devspec2array
		getAllSets
		getAllAttr
		IsIgnored
		unicodeEncoding
		WriteStatefile
		HttpUtils_NonblockingGet
		getAllAttr
		FileWrite
		FileRead
		FileDelete
		gettimeofday
		InternalTimer
		RemoveInternalTimer
		IsDisabled
		deviceEvents
	));
	
	#Exporting Initialize for Main
	GP_Export(qw(
		Initialize
	))
}

#########################################################################
# Trying to import functions from an applicaple JSON-Library
#########################################################################
my $JSON="none";
#JSON-Library-Usage was cpopied from Weather-APIs
# try to use JSON::MaybeXS wrapper
# for chance of better performance + open code
eval {
    require JSON::MaybeXS;
    import JSON::MaybeXS qw( decode_json encode_json );
	$JSON='JSON::MaybeXS';
    1;
} or do {

    # try to use JSON wrapper
    #   for chance of better performance
    eval {
        # JSON preference order
        local $ENV{PERL_JSON_BACKEND} =
          'Cpanel::JSON::XS,JSON::XS,JSON::PP,JSON::backportPP'
          unless ( defined( $ENV{PERL_JSON_BACKEND} ) );

        require JSON;
        import JSON qw( decode_json encode_json );
		$JSON='JSON';
        1;
    } or do {

        # In rare cases, Cpanel::JSON::XS may
        #   be installed but JSON|JSON::MaybeXS not ...
        eval {
            require Cpanel::JSON::XS;
            import Cpanel::JSON::XS qw(decode_json encode_json);
			$JSON='Cpanel::JSON::XS';
            1;
        } or do {

            # In rare cases, JSON::XS may
            #   be installed but JSON not ...
            eval {
                require JSON::XS;
                import JSON::XS qw(decode_json encode_json);
				$JSON='JSON::XS';
                1;
            } or do {

                # Fallback to built-in JSON which SHOULD
                #   be available since 5.014 ...
                eval {
                    require JSON::PP;
                    import JSON::PP qw(decode_json encode_json);
					$JSON='JSON::PP';
                    1;
                } or do {

                    # Fallback to JSON::backportPP in really rare cases
                    require JSON::backportPP;
                    import JSON::backportPP qw(decode_json encode_json);
					$JSON='JSON::backportPP';
                    1;
                };
            };
        };
    };
};

#########################################################################
# Constants and defaults
#########################################################################

use constant {
	FA_VERSION 				=> '0.2.0',			#Version of this Modul
	FA_DEFAULT_FOLDER 		=> './www/fhemapp',	#Default Path to FHEMapp
	FA_VERSION_FILENAME 	=> 'CHANGELOG.md',	#Default Version Filename
	FA_INIT_INTERVAL		=> 60,				#Default Startup Interval
	FA_DEFAULT_INTERVAL		=> 3600,			#Default Interval
	FA_GITHUB_URL 			=> 'https://github.com/jemu75/fhemApp',
	FA_GITHUB_LATEST_SUB    => 'releases/latest',
	FA_GITHUB_PACKAGE_SUB   => 'archive/refs/tags',
	FA_MOD_TYPE 			=> (split('::',__PACKAGE__))[-1],
	INT_SOURCE_URL			=> 'SOURCE_URL',	#INTERNAL NAME
	INT_CONFIG_FILE			=> 'CONFIG_FILE',	#INTERNAL NAME
	INT_INTERVAL			=> 'INTERVAL',		#INTERNAL NAME
	INT_VERSION				=> 'VERSION',		#INTERNAL NAME
	INT_JSON_LIB			=> '.JSON_LIB',		#INTERNAL NAME
	INT_LOCAL_INST			=> 'LOCAL',			#INTERNAL NAME
	INT_PATH				=> 'PATH'			#INTERNAL NAME
};


#Preparing attribute list
no warnings 'qw';
my @attrList = qw(
	dark:1,0
	disable:1,toggle
	interval
	sourceUrl
	view
);
use warnings 'qw';



sub
#========================================================================
create_fhemapp_folder()
#========================================================================
{
	my $name=shift // return;	
	my $destFolder=InternalVal($name,INT_PATH,'none');	
}


sub
update
{
	my $hash=shift // return;

    my $name = $hash->{NAME};
	

	my $url=ReadingsVal($name,'.latest_package',undef);
	
	if($url) {
		Log($name,"Requesting: $url",4);
		my $param = {
						url        => $url,
						timeout    => 5,
						hash       => $hash,                                                                                 
						method     => "GET",                                                                                 
						header     => "User-Agent: TeleHeater/2.2.3\r\nAccept: application/json",                            
						callback   => \&update_response                                                                  
					};

		HttpUtils_NonblockingGet($param);                                                                                    	
	}
	return;

}

sub
#========================================================================
update_response{
#========================================================================
    my ($param, $err, $data) = @_;
    my $hash = $param->{hash};
    my $name = $hash->{NAME};




    if($err ne "")                                                                                                      
    {
        Log($name,"error while requesting ".$param->{url}." - $err",4);                                               
        readingsSingleUpdate($hash, ".fullResponse", "ERROR: $err", 0);  		
    }

    elsif($data ne "")                                                                                                  
    {
        Log($name,"update data recieved ".$param->{url},4);                                               
		#my $dir = File::Temp->newdir();
		my $dir = tempdir();
		$dir=~ s!/*$!/!;
		my $filename="${dir}fhemapp.latest.tar.gz";
		my @content;
		push @content,$data;
		
        Log($name,"writing $filename ",4);                                               
		
		#FileWrite($filename,@content);
		FileWrite({FileName => $filename,ForceType => 'file'},@content);
		my $cmd="tar -xvzf $filename -C $dir";
        Log($name,"extract cmd '$cmd' ",4);                                               
		my $res=system($cmd);
		#sleep 30;
    }
	return;
    
}	


sub 
#========================================================================
Initialize
#========================================================================
{
	my $hash=shift // return;
	
    $hash->{DefFn}     = \&Define;
    $hash->{GetFn}     = \&Get;
    $hash->{SetFn}     = \&Set;
	$hash->{DeleteFn}  = \&Delete;
	$hash->{CopyFn}    = \&DeviceCopied;
	$hash->{RenameFn}  = \&DeviceRenamed;
	$hash->{NotifyFn}  = \&Notify;
	$hash->{AttrFn}    = \&Attr;
	
    $hash ->{AttrList} = join(' ', @attrList);	
}


sub 
#========================================================================
Request_UpdateData($)
#========================================================================
{
    my ($hash, $def) = @_;
    my $name = $hash->{NAME};
	
	my $url=AttrVal($name,'sourceUrl',FA_GITHUB_URL); #FA_GITHUB_URL;
	$url=~ s!/*$!/!;
	$url.=FA_GITHUB_LATEST_SUB;
	
	Log($name,"Requesting: $url",4);
    my $param = {
                    url        => $url,
                    timeout    => 5,
                    hash       => $hash,                                                                                 
                    method     => "GET",                                                                                 
                    header     => "User-Agent: TeleHeater/2.2.3\r\nAccept: application/json",                            
                    callback   => \&Reaponse_UpdateData                                                                  
                };

    HttpUtils_NonblockingGet($param);                                                                                    
	return;
}

#========================================================================
sub Reaponse_UpdateData($)
#========================================================================
{
    my ($param, $err, $data) = @_;
    my $hash = $param->{hash};
    my $name = $hash->{NAME};

    if($err ne "")                                                                                                      
    {
        Log($name,"error while requesting ".$param->{url}." - $err",4);                                               
        readingsSingleUpdate($hash, ".fullResponse", "ERROR: $err", 0);  		
    }

    elsif($data ne "")                                                                                                  
    {
        Log($name,"url ".$param->{url}." returned: $data",5);                                                         
		#Log3 $name, 3, Dumper $data;
		
		my $decode_json =  decode_json($data);
		
		my $tag=$decode_json->{tag_name};
		my $ver=(split('v.',$tag))[-1];
		readingsBeginUpdate($hash);
		readingsBulkUpdateIfChanged($hash,'.latest_url',$param->{url},0);
		readingsBulkUpdateIfChanged($hash,'.latest_version',$tag,0);
		
		my $package_url=AttrVal($name,'sourceUrl',FA_GITHUB_URL); #FA_GITHUB_URL;
		$package_url=~ s!/*$!/!;
		$package_url.=FA_GITHUB_PACKAGE_SUB;
		$package_url=~ s!/*$!/!;
		

		readingsBulkUpdateIfChanged($hash,'.latest_package',$package_url.$decode_json->{tag_name}.'.tar.gz',0);
		
		readingsBulkUpdateIfChanged($hash,'latest_release',$ver);
        readingsBulkUpdate($hash, ".fullResponse", $data,0); 
		readingsEndUpdate($hash,1);
    }
    
}
#========================================================================
sub Attr	# AttrFn
#========================================================================
{
	#my ($cmd,$name,$att,$val) = @_;
	
	my $cmd= shift // return undef;
	my $name=shift // return undef;
	my $att= shift // return undef;
	my $val= shift;

	my $hash   = $defs{$name};
	
	#set fa interval 59
	Log($name,"AttrFn: $cmd $name $att $val",4);
	if($att eq 'disable') {
		if($val && $val==1) {
			StopLoop($hash);
			readingsSingleUpdate($hash,'state','disabled',1);
			
		}
		elsif ( $cmd eq "del" or !$val ) {
			readingsSingleUpdate($hash,'state','defined',1);
			StartLoop($hash,FA_INIT_INTERVAL,0,1);
		}
	}
	elsif($att eq 'interval') {
		if($cmd eq 'set') {
			$val+=0;
			if($val < FA_INIT_INTERVAL) {
				return "Interval should not be set lower than ".FA_INIT_INTERVAL;
			} 
			elsif($val > 86400) {
				return "Interval should not be longer than 1 day (86400 sec)";
			}
			elsif($val==FA_DEFAULT_INTERVAL) {
				return "Default interval is already $val";
			}
			$hash->{&INT_INTERVAL}=$val;
			StartLoop($hash,FA_INIT_INTERVAL,1);
		}
		else
		{
			$hash->{&INT_INTERVAL}=FA_DEFAULT_INTERVAL;
			StartLoop($hash,FA_INIT_INTERVAL,1);
		}
	}
	elsif($att eq 'sourceUrl') {
		if($cmd eq 'set') {
			if($val eq FA_GITHUB_URL) {
				return "$val is already default for SourceUrl";
			}
			$hash->{&INT_SOURCE_URL}=$val;
		}
		else
		{
			$hash->{&INT_SOURCE_URL}=FA_GITHUB_URL;
		}
	}

	return undef;
}

sub 
#========================================================================
Notify	# NofifyFn
#========================================================================
{
  my $hash = shift // return;
  my $src_hash=shift // return;


  my $name = $hash->{NAME};
  return if(IsDisabled($name));

  my $src  = $src_hash->{NAME};

  my $events = deviceEvents($src_hash,1);
  return if( !$events );
  
  #Log($name,"Event recieved from '$src'",5);

  #HANDLING GLOBAL EVENTS
  if($src eq 'global') {
	  foreach my $event (@{$events}) {
	    Log($name,"EVENT: $src:$event",5);
		$event = "" if(!defined($event));
		if($event eq 'INITIALIZED') {
			Log($name,"Event recieved from '$src'",5);
			StartLoop($hash,FA_INIT_INTERVAL);
		}
	  } 
  } 
  return;
}




sub
#========================================================================
Define	# DefFn
#========================================================================
{
  my $hash=shift // return;	

  my $def=shift;
  my @a = split("[ \t][ \t]*", $def);

  my $name=shift @a;
  my $type=shift @a;
  my $url=shift@a;
  
  Log(undef,"DefFn called for $name $init_done",4);
  
  
  #Setting INTERNAL values
  $hash->{&INT_VERSION}=FA_VERSION;
  $hash->{&INT_SOURCE_URL}=AttrVal($name,'sourceUrl',FA_GITHUB_URL);
  $hash->{&INT_JSON_LIB}=$JSON;
  $hash->{&INT_CONFIG_FILE}=get_config_file($name);
  $hash->{&INT_INTERVAL}=AttrVal($name,'interval',FA_DEFAULT_INTERVAL);  
  $hash->{&INT_PATH}=$url;  

  $hash->{NOTIFYDEV}="global";
  
  #Internal PATH is only available if local path is specified in DEF
  if($url eq 'none') {
	delete($hash->{&INT_PATH});
	$hash->{&INT_LOCAL_INST}=0;
  } else {
  	$hash->{&INT_LOCAL_INST}=1;
  }
  
	
  #Setting defined state
  if(!$init_done) {
  	#Reading conifg on Define, e.g. when copied from other device
	#[todo]: this is not necessary on simple define .... Move to CopyFn?
  	ReadConfig($hash);
  }
  else 
  {
  	#Start Version loop 
	#[todo]: maybe move to global:Initialize handling in NotifyFn
	StartLoop($hash,FA_INIT_INTERVAL);
  }
  
  #Set startup disabled/defined state
  if(IsDisabled($name)) {
  	readingsSingleUpdate($hash,'state','disabled',0);   
  }
  else
  {
  	readingsSingleUpdate($hash,'state','defined',0); 
  }
  
  return "Wrong syntax: use define <name> fhemapp <localFhemappPath|none>" if(!$url);
}


sub
#========================================================================
Get		# GetFn
#========================================================================
{
	my $hash=shift // return;
	my $name=shift;
	my $opt=shift;
	
    return "\"get $name\" needs at least one argument" unless(defined($opt));

	if($opt eq 'config') {
		return encode_base64(get_config($hash));
	}
	elsif($opt eq 'rawconfig') {
		return get_config($hash);
	}	
	elsif($opt eq 'options') {
		return AttrOptions_json($name);
	}	
	elsif($opt eq 'version') {
		return get_local_version($hash);
	}	
	else
	{
		my $loc_gets='version:noArg';
		if(get_local_path($hash)) {
			return "Unknown argument $opt, choose one of config:noArg rawconfig:noArg $loc_gets";
		} else {
			return "Unknown argument $opt, choose one of config:noArg rawconfig:noArg";		
		}
	}
}

sub
#========================================================================
Set		# SetFn
#========================================================================
{
	my $hash=shift // return;
	my $name=shift;
	my $opt=shift;
	
	my @args=@_;
	    
    return "\"set $name\" needs at least one argument" unless(defined($opt));

	if($opt eq 'config') {
		set_config($hash,decode_base64(join(" ",@args)),1);
	}
	elsif($opt eq 'rawconfig') {
		set_config($hash,join(" ",@args),1);
	}
	elsif($opt eq 'update') {
		update($hash);
	}
	elsif($opt eq "checkVersions") {
		check_local_version($hash);
		Request_UpdateData($hash);
	}
	else {
		return "Unknown argument $opt, choose one of checkVersions:noArg update:noArg";
	}
    return undef;
}

sub 
#========================================================================
Delete	# DeleteFn
#========================================================================
#Cleanup when device is deleted
{
	my $hash=shift // return;
	
	#Cancel and delete runnint internal timer
	StopLoop($hash);
	#Delete config file 
	DeleteConfig($hash);		
}


sub 
#========================================================================
AttrNames{
#========================================================================
	my $name=shift;
	
	my @atts;
	if (!$name) {
		@atts=@attrList;
	} else {
		@atts=split(' ',getAllAttr($name));
	}
	
	my @rList;
	#foreach (@attrList) {
	foreach (@atts) {
		push @rList,(split(':', $_))[0];
	}
	return @rList;
}


sub
#========================================================================
AttrOptions_json
#========================================================================
{
	my $name=shift // return undef;

	my @rOpts;
	foreach my $att (AttrNames($name)) {
		my $val=AttrVal($name,$att,undef);
		push @rOpts, "\"$att\":\"$val\"" if(defined($val));
	}	
	my $jOpts=join(',',@rOpts);
	
	return $jOpts if($jOpts);
	
	return undef;
}


sub 
#========================================================================
get_config
#========================================================================
{
	my $hash=shift // return;
	
	my $name=$hash->{NAME};
	
	my $jOpts=AttrOptions_json($name);	
	my $config=$hash->{helper}{config};
	
	if(!$config) {
		$config=$config=ReadingsVal($name,".config",undef);
		if($config) {
			set_config($hash,$config,1);
			readingsDelete($hash,'.config');
		}
	}
	
	if($config) {
		my $ret;
		if($jOpts) {
		  $jOpts="{$jOpts}";
		  ($ret = $config) =~ s{(.*)\}}{$1,"attributes":$jOpts\}}xms;
		} else {
		  $ret=$config;
		}

		return $ret if($ret);
	
	}
	
	return jError("No config found!");
}

sub 
#========================================================================
set_config
#========================================================================
{
	my $hash=shift // return;
	my $newVal=shift // return;
	my $writeConfig =shift;
	
	$writeConfig //= 0;
	
	my $name=$hash->{NAME};
	
	$hash->{helper}{config}=$newVal;
	
	WriteConfig($hash) if($writeConfig);
	
}

sub
#========================================================================
jError {
#========================================================================
	my $err=shift;
	return "{\"error\":\"$err\"}";
}

sub
#========================================================================
get_config_file
#========================================================================
{
	my $name=shift // return;
	return lc("$FW_confdir/${name}_config.".FA_MOD_TYPE);	
}

sub 
#========================================================================
WriteConfig
#========================================================================
{
	my $hash=shift // return;
	my $name=$hash->{NAME};
	
	if(InternalVal('global','configfile','x') ne 'configDB') {
		if(! -d $FW_confdir) {
			if(!mkdir($FW_confdir)) {
				Log($name,"Unable to create missing config folder '$FW_confdir'",2);
				Log($name,"Cannot write config!",2);
				return;
			}
		}	
	}
	
	my $config=$hash->{helper}{config};
	
	if($config) {
		my @content;
		push @content,$hash->{helper}{config};

		my $filename=get_config_file($name);
		Log($name,"Writing config '$filename'...",4);
		FileWrite($filename,@content);
		readingsSingleUpdate($hash,'configLastWrite',localtime(),0);
		$hash->{&INT_CONFIG_FILE}=$filename if($hash->{&INT_CONFIG_FILE} ne $filename);
	} else {
		Log($name,"No config to write!",3);
	}
	return;
}

sub 
#========================================================================
ReadConfig
#========================================================================
{
	my $hash=shift // return;
	my $name=$hash->{NAME};
	my $filename=get_config_file($name);

	Log($name,"Reading config '$filename' ...",4);

	my ($err,@content)=FileRead($filename);	
	if(!$err) {
		$hash->{helper}{config}=join('',@content);
		readingsSingleUpdate($hash,'configLastRead',localtime(),0);
	} else {
		readingsSingleUpdate($hash,'configLastRead',$err,0);
		Log($name,"ERROR: Reading config!",2);
		Log($name,$err,2);
	}
	
	return;
}

sub 
#========================================================================
DeleteConfig
#========================================================================
{
	my $hash = shift // return;
	my $name =shift;
	$name //= $hash->{NAME};

	my $filename=get_config_file($name);
	Log($name,"Deleting config '$filename' ...",4);
	FileDelete($filename);
	
	return;
}

sub 
#========================================================================
DeviceCopied	#CopyFn
#========================================================================
{
	my $old_name=shift // return;
	my $new_name=shift // return;
		
	Log ($new_name,"Copying config '$old_name' -> '$new_name'",4);
	$defs{$new_name}{helper}{config} = $defs{$old_name}{helper}{config};
	#Log($new_name,$new_hash->{helper}{config},5);
	
	WriteConfig($defs{$new_name});
	
	return;
}

sub 
#========================================================================
DeviceRenamed	#RenameFn
#========================================================================
{
	my $new_name=shift // return;
	my $old_name=shift // return;
	
	Log($new_name,"Device renamed '$old_name' -> '$new_name'",4);
	my $new_hash=$defs{$new_name};
	WriteConfig($new_hash);

	my $oldFile=get_config_file($old_name);
	Log($new_name,"Deleting config '$oldFile' ...",4);
	FileDelete($oldFile);
	
	return;

}

sub 
#========================================================================
get_local_path
#========================================================================
{
	my $hash=shift // return undef;
	my $append=shift;
	
	my $name=$hash->{NAME};
	my $path=InternalVal($name,INT_PATH,undef);
	
	
	
	if($path) {
		if(-d $path) {
			if($append) {
				$path =~ s!/*$!/!;
				$path .= $append;
			}
			return $path;
		}
	}	
	return undef;
}


sub
#========================================================================
get_local_version
#========================================================================
{
	my $hash=shift // return;
	
	
	my $name=$hash->{NAME};
	my $filename=get_local_path($hash,FA_VERSION_FILENAME);
	
	
	
	if($filename) {
		my ($err,@content)=FileRead({FileName => $filename,ForceType => 'file'});
	
		my $config='';
		
		if(FA_VERSION_FILENAME=~/\.json/) {
			#handling vesion.json
			if(!$err) {
				$config=join('',@content);	
			}
			my $data=decode_json($config);
			return $data->{version};		
		} else {
			#handling CHANGELOG.md
			my $vLine=shift @content;
			return (split(' ',$vLine))[-1];
		}
	}
	
	
	return undef;
}

sub
#========================================================================
check_local_version
#========================================================================
{
	my $hash=shift // return;

	if($hash->{&INT_LOCAL_INST}) {
		readingsBeginUpdate($hash);

		my $ver=get_local_version($hash);
		if($ver) {
			readingsBulkUpdateIfChanged($hash,'local_version',$ver,1);
		} 
		else 
		{
			readingsBulkUpdateIfChanged($hash,'local_version','not found',1);
		}
		
		readingsEndUpdate($hash,1);

	} 
	else 
	{
		readingsDelete($hash,'local_version');		
	}
	return;
}

sub 
#========================================================================
StartLoop
#========================================================================
{
	my $hash=shift // return;	
	my $time=shift;
	my $stop=shift;
	my $force=shift;
	
	my $name=$hash->{NAME};
	
	if(!IsDisabled($name) or $force) {
		$stop //= 1;
		$time //= 0;
		$time = AttrVal($name,'interval',FA_DEFAULT_INTERVAL) if(!(0+$time));
		StopLoop($hash) if($stop);
		Log($name,"Starting internal timer loop ($time sec.)",5);
		my $nextTimer=gettimeofday()+$time;
		InternalTimer($nextTimer,\&Loop,$hash);
		readingsSingleUpdate($hash,'next_cycle',localtime($nextTimer),0);
	}
	
	return;
}

#========================================================================
sub Loop
#========================================================================
{
	my $hash = shift // return;

	my $name = $hash->{NAME};
	Log($name,"Internal timer loop elapsed",5);
	
	check_local_version($hash);
	Request_UpdateData($hash);
	
	StartLoop($hash);
	
	return;

}

sub 
#========================================================================
StopLoop
#========================================================================
{
	my $hash=shift // return;	
	my $name=$hash->{NAME};
	
	Log($name,"Stopping internal timer loop",5);
	RemoveInternalTimer($hash);		
	readingsSingleUpdate($hash,'next_cycle','disabled',0);

	return;
}


sub
#========================================================================
Log
#========================================================================
#own log routine adding package and device name to log entries
{
	my $name=shift;
	my $msg=shift;
	my $verb=shift;
	
	$msg //= 'noMsg';
	my $verbRef = $name; #(undef=global!)
	$name //= __PACKAGE__;
	$verb //= 3;
	

	Log3 $verbRef,$verb,'['.$name.']: '.$msg;
	return undef
}

#######################################################################################

1;

=pod
=item helper
=item summary Settings and special functions for FHEMapp
=item summary_DE Einstellungen und Spezialfunktionalitaet fuer FHEMapp

=begin html

<a id="FHEMAPP"></a>
<h3>fhemApp</h3>
<ul>

  Defines a helper device for FHEMapp UI.<br>
  Provides configuration storage, special functionalities for a FHEMapp UI.
  Multiple instances of FHEMAPP devices are possible.
  <br><br>

  <a id="FHEMAPP-define"></a>
  <b>Define</b>
  <ul>
    <code>define &lt;name&gt; FHEMAPP [pathToLocalFolder|none]</code>
    <br><br>

	pathToLocalFolder = A local folder that could be accessed by FHEM and
	from which FHEMapp UI is provided via FHEMWEB.
	Usually this is a folder below ./www
	<br><br>
	If no local installations should be managed by this device you could
	specify none instead of a folder path.
	<br><br>

    Examples:
    <ul>
      <code>define fa FHEMAPP ./www/fhemapp</code><br>
    </ul>
    <ul>
      <code>define fa2 FHEMAPP none</code><br>
    </ul>
  </ul>
  <br>

  <a id="FHEMAPP-set"></a>
  <b>Set</b>
  <ul>
    <li>checkVersions<br>
	Executes the version check, which is usually performed cyclic, immediately.
	This has no effect on the actual version check cycle itself.
	</li>
  </ul>
  <br>

  <a id="FHEMAPP-get"></a>
  <b>Get</b> 
  <ul>
    <li>config<br>
	returns the currently saved config for FHEMapp in json format.
	This is usually only used by FHEMapp itself, but can be useful
	for debugging purposes.
	</li>
	<li>version<br>
	Returns the current version number of a local FHEMapp installation.
	If no local installation is specified (s. define), there will be
	no result (undef).
	</li>
  </ul>
  <br>

  <a id="FHEMAPP-attr"></a>
  <b>Attributes</b>
  <ul>
    <li><a href="#disable">disable</a><br>
	this will only disable the cyclic version checking!</li>
    <li><a id="FHEMAPP-attr-dark">dark</a><br>
      Defines whether FHEMapp UI will be displayed in dark mode (dark=1)
	  or in light mod (dark=0)</li>

    <li><a id="FHEMAPP-attr-interval">interval</a><br>
      Overrides the default interval (3600 seconds) for cyclic version 
	  checking. Max value is 1 day (86400 seconds) and minimum value
	  is 1 minute (60) seconds.<br>
	  See also INTERNAL INTERVAL
	  </li>

    <li><a id="FHEMAPP-attr-sourceUrl">sourceUrl</a><br>
      Overrides the default URL for the source repository, used for 
	  version checking, update and installation. This is usally a
	  github repository<br>
	  See also INTERNAL SOURCE_URL
	  </li>

  </ul>
  <br>

</ul>

=end html

=begin html_DE

<a id="FHEMAPP"></a>
<h3>FHEMAPP</h3>
<ul>

  Definiert ein Hilfs-Device für FHEMapp, das für die Konfigurationsverwaltung
  und Bereitstellung von Spezialfunktionalität für FHEMapp zuständig ist.
  Es können mehrer Instanzen solcher Hilfs-Devices existieren.
  <br><br>

  <a id="FHEMAPP-define"></a>
  <b>Define</b>
  <ul>
    <code>define &lt;name&gt; FHEMAPP &lt;pathToLocalFolder|none&gt;</code>
    <br><br>
	
	pathToLocalFolder = Ein lokaler Ordner, der von FHEM aus erreicht werden
	kann und unter dem das FHEMapp UI von FHEMWEB bereitgestellt wird.
	Normalerweise ist das ein Ordner unterhalb von ./www
	<br><br>
	Sollen keine lokalen FHEMapp UI Installationen durch das Modul verwaltet
	werden, kann hier statt des Pfade none angegeben werden.
	<br><br>
    Beispiele:
    <ul>
      <code>define fa FHEMAPP ./www/fhemapp</code><br>
    </ul>
    <ul>
      <code>define fa2 FHEMAPP none</code><br>
    </ul>
  </ul>
  <br>

  <a id="FHEMAPP-set"></a>
  <b>Set</b>
  <ul>
    <li>checkVersions<br>
	F&uuml;hrt den Check, der nmormalerweise zyklisch ausgef&uuml;hrt wird, 
	sofort aus. Der normale Abfragezyklus wird davon nicht beeinflu&szlig;t.
	</li>
  </ul>
  <br>

  <a id="FHEMAPP-get"></a>
  <b>Get</b> 
  <ul>
    <li>config<br>
	Gibt die aktuell gespeicherte Konfiguration von FHEMapp aus.
	Diese Funktion wird normalerweise ausschlie&szlig;lich durch FHEMapp direkt
	verwendet, kann aber f&uuml;r Debugging-Zwecke n&uuml;tzlich sein.
	</li>
	<li>version<br>
	Gibt die Versionsnummer der lokalen FHEMapp-Installation zur&uuml;ck.
	Sollte keine lokale FHEMapp-Instanz vorhanden sein (s. define),
	so wird hier kein Ergebnis (undef) zur&uuml;ckgeliefert.
	</li>
  </ul>
  <br>

  <a id="FHEMAPP-attr"></a>
  <b>Attributes</b>
  <ul>
    <li><a href="#disable">disable</a>
	Es wird lediglich die zyklische Versionspr&uuml;fung deaktiviert!</li>

    <li><a id="FHEMAPP-attr-dark">dark</a><br>
      Bestimmt, ob das FHEMapp-UI im dark-Mode (dark=1) angezeigt wird oder
	  im light-Mode (dark=0)</li>

    <li><a id="FHEMAPP-attr-interval">interval</a><br>
      &uuml;berschreibt das Default-Intervall (alle 3600 Sekunden) für die zyklische
	  Abfrage der Versionsinformationen. Minimum-Wert ist 60 Sekunden, Maximum
	  ist 1 Tag (86400 Sekunden).<br>
	  Siehe auch INTERNAL INTERVAL</li>

    <li><a id="FHEMAPP-attr-sourceUrl">sourceUrl</a><br>
      Mit diesem Attribut kann die Default-Url des Quell-Repositories, das für 
	  Versions-Abfragen, Installation und Aktualisierungen verwendet werden soll
	  &uuml;berschrieben werden. Das ist i.d.R. ein github-Repository.<br>
	  Siehe auch INTERNAL SOURCE_URL</li>

  </ul>
  <br>

</ul>

=end html_DE

=cut
