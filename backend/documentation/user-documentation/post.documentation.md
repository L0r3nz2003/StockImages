# Stockimages

## 1. Generell

### Beschreibung

- Diese APi Liefert Daten über Benutzer und macht sie über die WebApp änderbar. 

&nbsp;

----
## 2. Post Info
### 2.1 Neuer User
### URL
```javaScript
     POST: {HOST}/users/create
```
### Rückgabe
### Erfolg

```javascript
    HTTP Status       : 200
    HTTP Nachricht    : OK
```
```javascript
    HTTP code       : 404
    HTTP message    : User already exists
```
### Beispiel
```javascript
    //Anfrage
    POST: {HOST}/users/create
    //Ergebnis
    INSERT Successfull
```
### Fehler
```javascript
    HTTP code       : 404
    HTTP message    : User already exists
```