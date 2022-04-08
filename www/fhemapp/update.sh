#!/bin/bash
gitrepo=https://github.com/jemu75/fhemApp.git
tempdir=update
appdir=$(dirname "$(readlink -e "$0")")
echo ---------------------------------------------------------------
echo $(date) " Starting Update FHEMApp..."
echo ---------------------------------------------------------------
rm -rf $tempdir
git clone $gitrepo $tempdir
rsync -av $tempdir/www/fhemapp/ $appdir --exclude cfg | sed '0,/^$/d'
rm -rf $tempdir
echo ---------------------------------------------------------------
echo $(date) " Updating FHEMApp is finished."
echo ---------------------------------------------------------------
