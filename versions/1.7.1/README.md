
# SciELO Design System (Design System SciELO)

Este pacote compreende toda a estrutura CSS referente ao SciELO Design System na versão Bootstrap.


## Como instalar

Para instalar o pacote é necessário:

* Ter instalado na máquina [Node.js](https://nodejs.org/en/), [NPM](https://www.npmjs.com/get-npm) e [Gulp](https://gulpjs.com/docs/en/getting-started/quick-start).
* Ter o pacote do projeto `.tgz` do projeto.

Para instalar, faça:
1. Descomprima os arquivos na pasta que desejar;
2. Execute o comando `npm install`. Para instalar os pacotes vinculados ao projeto (descritos no arquivo `package.json`)


## Estrutura do pacote

```
.
├─ dist // arquivos compilados para inclusão nos projetos
├─ examples // versões de cada componente para visualização
├─ src // arquivos editáveis
├─── bootstrap // alterações no bootstrap original
├─── common // conteúdos que extendem o bootstrap
```

### Como é feita as alterações no pacote original do Bootstrap

Por meio da inclusão da estrutura original com alterações nas variáveis de configuração e por meio da inclusão *fixes* para alterar o que eventualmente não é comportado pelo framework.

**Onde estão as configurações originais:**

*Bootstrap*
``node_modules/bootstrap/scss/bootstrap.scss``
``node_modules/bootstrap/scss/_variables.scss``


**Como o projeto reconstrói as configurações**

Substituindo as configurações, incluindo fixes e regerando os CSS com base nos originais, porém com a aplicação da identidade visual do Aberto Design System.

*Bootstrap*
``src/bootstrap/scss/bootstrap.scss``
``src/bootstrap/scss/settings/_variables.scss``


## O que preciso para contribuir com o projeto

1. Saber que a natureza dos arquivos do Bootstrap não podem ser alterada, pois novas versões podem ser aplicadas ao pacote. Portanto não devem sofrer alterações os arquivos na pasta ``node_modules/bootstrap/``

2. Todas as configurações em comum entre as bibliotecas ficam na pasta ``src/common/``, portanto toda vez que um mixin ou variável começar com ``$__classPrefix`` (scielo) significa que ela está na common.

3. O modelo de estruturação de pastas se baseia nos conceitos do [ITCSS](https://blog.codeminer42.com/how-to-organize-your-styles-with-itcss-3787cbc6dcbf), assim como a nomenclatura tanto de classes, variáveis e mixins se baseiam no [BEM](http://getbem.com/naming/). Com a inclusão de *2 underlines* antes, para evitar que variáveis e mixins entrem em conflito com qualquer item do Bootstrap.

4. Não alterar o conteúdos das pastas ``dist`` e ``examples``. Pois todos os arquivos dali são gerados por rotinas do Gulp.

 ---

### Como começar

Para rodar o ambiente de desenvolvimento, execute na linha de comando:
``$ gulp``

Este comando irá subir as rotinas de geração do CSS, Ícones, HTMLs de exemplos, assim como o Webserver que irá disponibilizar o site no endereço:
``http://localhost:8000/``

Recomendamos visualizar as alterações no endereço:
``http://localhost:8000/examples/``

**Pronto!** Agora é só programar.

---  

### Dicas

Os exemplos estão na pasta ``src/bootstrap/examples/``, para facilitar a manutenção, utilizam injeções de parciais HTML:
``<!--=require ./_parts/_headTag.html -->``

Este tipo de declaração fará com que o arquivo gerado na pasta ``examples/`` tenha a inclusão do arquivo mencionado no comentário.


#### SASS
**Quando for elaborar o CSS para os temas (light e dark), recomendamos o seguinte modelo:**

1. Faça a declaração padrão para o tema light. Por exemplo: ``color: $__text--light;``
3. Inclua o mixin para fazer a configuração no tema dark: ``@include __on-theme--dark { color: $__text--dark; }``
4. Logo após reforce o estilo para o tema light (para quando ele for aplicado dentro do tema dark: ``@include __on-theme--light { color: $__text--light;``

Desta forma, evita-se problemas com a cascata na declaração.