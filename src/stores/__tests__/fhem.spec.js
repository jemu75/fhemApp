import { setActivePinia, createPinia } from 'pinia'
import { useFhemStore } from '../fhem'
import { describe, beforeEach, it, expect } from 'vitest'
import { useI18n } from 'vue-i18n'

describe('fhemStore Unit-Tests', () => {
    beforeEach(() => {
        // creates a fresh pinia and makes it active
        // so it's automatically picked up by any useStore() call
        // without having to pass it to it: `useStore(pinia)`
        
        setActivePinia(createPinia())
    })

    it('handleUrl - Change Connection', () => {
        const fhem = useFhemStore()
        const res = { connChanged: true, routeChanged: false, configChanged: false, langChanged: false }
        
        expect(fhem.handleURL({ query: { protocol: 'xyz' } })).toStrictEqual(res)
        expect(fhem.handleURL({ query: { server: 'xyz' } })).toStrictEqual(res)
        expect(fhem.handleURL({ query: { port: 'xyz' } })).toStrictEqual(res)
        expect(fhem.handleURL({ query: { path: 'xyz' } })).toStrictEqual(res)
    })

    it('handleUrl - no Query', () => {
        const fhem = useFhemStore()
        const res = { connChanged: false, routeChanged: false, configChanged: false, langChanged: false }
        
        expect(fhem.handleURL({ })).toStrictEqual(res)
        expect(fhem.handleURL({ query: {} })).toStrictEqual(res)
    })

    it('handleUrl - View', () => {
        const fhem = useFhemStore()
        const res = { connChanged: false, routeChanged: true, configChanged: false, langChanged: false }
        
        expect(fhem.handleURL({ params: { view: 'home' } })).toStrictEqual(res)
    })

    it('handleUrl - Config', () => {
        const fhem = useFhemStore()
        const res = { connChanged: false, routeChanged: false, configChanged: true, langChanged: false }
        
        expect(fhem.handleURL({ params: { config: 'fhemapp' } })).toStrictEqual(res)
    })

    it('base64ToString', () => {
        const fhem = useFhemStore()
        
        expect(fhem.base64ToString('SGVsbG8gV29ybGQ=')).toStrictEqual('Hello World')
        expect(fhem.base64ToString({ name: 'hello' })).toStrictEqual(false)
    })

    it('stringToJson', () => {
        const fhem = useFhemStore()
        
        expect(fhem.stringToJson('{ "name": "hello" }')).toStrictEqual({ name: 'hello'})
        expect(fhem.stringToJson('hello world')).toStrictEqual(false)
    })

    it('handleDefs', () => {
        const fhem = useFhemStore()
        
        expect(fhem.handleDefs(["::jens"],["name"],false)).toStrictEqual({ name: 'jens' })        
        expect(fhem.handleDefs(["::true"],["show"],false)).toStrictEqual({ show: true })
        expect(fhem.handleDefs(["on:on:jens"],["name"],false)).toStrictEqual({ name: 'jens' })
        expect(fhem.handleDefs(["on:on:jens"],null,false)).toStrictEqual({ 0: 'jens' })
        expect(fhem.handleDefs(["off:on:jens"],["name"],false)).toStrictEqual({})
        expect(fhem.handleDefs(["Wohnzimmer::%s", "Flur::%s"],["route"],true)).toStrictEqual([{ route: 'Wohnzimmer'},{ route: 'Flur'}])
        expect(fhem.handleDefs(["Wohnzimmer::rooms->%s", "Flur::rooms->%s"],["route"],true)).toStrictEqual([{ route: 'rooms->Wohnzimmer'},{ route: 'rooms->Flur'}])
        expect(fhem.handleDefs(["Wohnzimmer,Flur::rooms->%s","Fenster::groups->%s"],["route"],true,',')).toStrictEqual([{ route: 'groups->Fenster' },{ route: 'rooms->Wohnzimmer'},{ route: 'rooms->Flur'}])
        expect(fhem.handleDefs(["Wohnzimmer:Flur:%s"],["route"],true,',')).toStrictEqual([])
    })

})