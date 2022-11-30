## GitHub Pages för Diwise

Här hanterar vi mer teknisk dokumentation än den som annars finns på [diwise.se](https://diwise.se)

Dokumentationen byggs med [hugo](https://gohugo.io) baserat på den struktur som finns under katalogen [`site`](./site). Detta kan göras med live reload under redigeringen, eller för publicering med hjälp av en GitHub Action när en merge görs till [`main`](https://github.com/diwise/diwise.github.io/tree/main)

### Hur gör jag?

* Klona ner detta repository
* Se till att ha hugo installerat. Se [https://gohugo.io/installation/](https://gohugo.io/installation/).
* Uppdatera temat som används med `git submodule sync` följt av `git submodule update --init --force`
* Navigera in i `site`
* Starta automatisk sidgenerering och live reload med `hugo server`
* Se resultatet live via [http://localhost:1313](http://localhost:1313).

### Ok, men sedan då?

Hur temat som används fungerar finns beskrivet på [https://mcshelby.github.io/hugo-theme-relearn/](https://mcshelby.github.io/hugo-theme-relearn/).
