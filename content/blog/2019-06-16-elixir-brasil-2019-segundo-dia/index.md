---
title: Elixir Brasil 2019 - Segundo dia
description: "O segundo dia de #ElixirBrasil foi tão impressionante quanto o primeiro - e eu estava lá também!"
date: "2019-06-16T20:00:00.000Z"
cover: ./amanda.jpg
---

<p>
    <a href="https://2019.elixirbrasil.com/" rel="nofollow" class="image-link" title="Elixir Brasil 2019">
        <img src="./elixir_brasil_logo.svg" alt="Elixir Brasil 2019" style="width: 413px; height: 164px">
    </a>
</p>

No post anterior, falei sobre o [primeiro dia do evento](/2019-05-30-elixir-brasil-2019-primeiro-dia/). Hoje trago para vocês o segundo dia - que foi tão impressionante quanto o primeiro. Foi na mesma pegada do dia anterior, com dois keynotes e duas trilhas paralelas. É impossível estar em dois lugares ao mesmo tempo, senão tinha visto todas as talks. Foi o sentimento da galera do trampo que foi comigo também, de ficarmos indecisos sobre o que assistir visto a qualidade das talks e temas escolhidos.

---

## Lições aprendidas em um projeto Elixir / OTP - [Amanda Sposito](https://www.linkedin.com/in/amandasposito/)

Infelizmente, cheguei ~~muito~~ atrasado no evento e perdi o keynote da Amanda quase inteiro. Consegui ver o finalzinho com algumas dicas, que coloco aqui. Tentarei não cometer esse vacilo da próxima vez, principalmente com uma talk que queria tanto ver 😢

Quando cheguei, ela estava citando o artigo [Unit Tests in Elixir - Part 2](http://devonestes.herokuapp.com/unit-tests-in-elixir-part-2) do Devon C. Estes, porém não peguei o contexto do que ela estava falando. Também recomendou ver o [SORTID Elixir](https://www.youtube.com/watch?v=eldYot7uxUc), uma talk da Georgina McFadyen sobre os princípios `SOLID`, mas voltados para programação funcional e Elixir.

Em seguida, definiu que [Contexts](https://hexdocs.pm/phoenix/contexts.html), do Phoenix, definem limites entre diferentes módulos da aplicação - não tem mais aquele padrão `MVC`. Porém, esses contextos podem ficar maiores do que deveriam com o passar do tempo e com a interação entre eles. Uma dica então é evitar manter código ortogonal ao contexto, no contexto. Além disso, mantenha *queries* próximas ao seu *schema*. Uma exceção para essa regra, segundo a Amanda, são de *queries* que lidam com mais de um *schema*. Também recomendou o outro post do Devon, [A Proposal for Some New Rules for Phoenix Contexts](http://devonestes.herokuapp.com/a-proposal-for-context-rules).

!["Mantenha queries próximas de seu schema" - Amanda Sposito.](./amanda.jpg)

Sobre **Umbrella Projects**, a Amanda explicou que é uma maneira de organizar seu código, que vira tipo um monolito organizado. É necessário ter cuidado com dependências circulares, quando um app acessa o outro app que por sua vez acessa de novo o primeiro - enfim, vocês entenderam.

Essas foram as dicas que consegui pegar da talk. Os slides estão no [SpeakerDeck](https://speakerdeck.com/amandasposito/aprendizados-de-um-projeto-elixir-otp) e podem trazer mais insights sobre o que ela passou.

## Domain-Driven Design with Contexts - [Adam Tew](https://twitter.com/adamjtew)

Na trilha avançada, começamos com a talk do Adam, que trabalha na [Podium](https://www.podium.com/), e veio até o Brasil pra falar com a gente sobre _Domain-Driven Design_ (DDD), um tema que independe de uma linguagem específica mas que casa muito bem com Elixir.

### Modelagem
O **DDD** é primariamente utilizado para aplicações maiores e precisa de muita ponderação para modelar. Tem o objetivo de descobrir o que é o domínio. O [livro sobre DDD do Eric Evans](https://www.amazon.com.br/dp/B00794TAUG/ref=dp-kindle-redirect?_encoding=UTF8&btkr=1) é o que você pode ler para aprender sobre os conceitos do DDD.

No DDD, você precisa de um **domínio** para modelar. Um domínio é o problema que o seu cliente, ou a sua empresa, quer resolver. Você precisa de **especialistas de domínio** que entendam muito sobre o problema proposto. Use **mapeamento de contexto** para descoberta, coloque todos os envolvidos numa sala e peça para os mesmos escreverem tudo sobre o domínio em *post-its* e coloque numa parede, para que vocês definam as **entidades** (substantivos) e os **eventos** (verbos).

![Adam Tew mapeando entidades e eventos.](./adam.jpg)

Agrupe todas as entidades que façam sentido. Seu **core domain** (domínio principal) é essencialmente o que é realmente importante para o negócio. Você tem também **support domains** (domínios de suporte), que apoiam o *core domain* a atingir seu objetivo.

![Domínios de suporte no DDD.](./ddd_support_domains.jpg)

Outras maneiras de mapear seus domínios é através de *Domain Storytelling*, que tenta contar uma história sobre os atores e as ações entre eles, ou de *Event Storming*. É importante sempre utilizar uma **linguagem ubíqua** entre todos do time. Escreva em algum lugar uma lista de todas as palavras comuns utilizadas.

### Modularização
Após agrupar os domínios, é hora de fazer algo em relação a isso. Numa arquitetura de camadas (*Layered Architecture*), temos a `UserInterface` como ponto de entrada, se comunicando com as camadas abaixo: `Application`, `Domain` e `Infrastructure`. De `Application`, a comunicação é com `Domain` e `Infrastructure`. E assim por diante. As dependências fluem para as camadas abaixo.

![Arquitetura de Camadas de uma aplicação feita com DDD.](./ddd_layered_architecture.jpg)

Um *bounded context* está tipicamente em um alto nível de granularidade e define uma área completa de funcionalidade dentro do seu sistema. Você deve abstrair o que provavelmente irá mudar no futuro, que é a lógica de negócio.

Para gerar um contexto, podemos testar os [geradores de código do Phoenix](https://hexdocs.pm/phoenix/Mix.Tasks.Phx.Gen.Html.html#content):

```bash
mix phx.gen.html Menu MenuItem menu_items name:string:unique quantity:integer
```

Um contexto deve dizer a **intenção** do que você quer fazer e não **como** você fez isso. E isso é algo muito difícil de se fazer segundo o Adam.

#### Assimilando Conhecimento
Prefira ciclos de desenvolvimento ágil. Você vai descobrir as coisas depois do que você acha que deveria descobrir. Junte os dados que devam estar juntos. Um **Aggregate** representa esses dados que deveriam estar juntos. O **Aggregate root** é o elemento principal. Prefira passar os **aggregates** pelo sistema, tendo todos os dados que você precisa diretamente.

#### Como compartilhar entre os diferentes contextos
Tem uma palestra do Andrew Hao, [Event-driven messaging](https://www.youtube.com/watch?v=5MBGDM8xSQg) que fala sobre como fazer mensageria em um sistema orientado a eventos.

Use os **eventos** do **mapa de contextos** com pub/sub. Crie um `EventBus` e dentro do contexto crie um módulo `EventHandler`, que vai receber eventos do `EventBus`.
Esse conceito é conhecido no DDD como camada **anti-corrupção**, que não polui um contexto com dados de outro contexto, se comunicando através de mensagens.

### Preocupações
O Adam expôs suas preocupações sobre o DDD, começando com o fato de que há toneladas de teoria sobre o tema, representando muito pra absorver e pensar sobre durante o aprendizado. Provavelmente, utilize DDD somente para grandes bases de códigos - e para essas grande bases, implemente em fases, peça por peça. Pode ser difícil de se aprender também pelo fato de os livros serem mais voltados para OO, precisando pensar em como ficaria com programação funcional.

### Conclusões
Priorize a **descoberta dos domínios**. Abstraia no sistema o que irá mudar no **negócio**. Escute os **especialistas de domínio**. Sempre consulte o **mapa de contextos**. O Adam também citou o livro [Functional and reactive domain modeling](https://www.manning.com/books/functional-and-reactive-domain-modeling) como uma referência da sua talk.


[Confira os slides da talk do Adam.](https://docs.google.com/presentation/d/1ano0faAXjj4GMw6bJDLeI1-RtX_DlDLLQAkjXnAEGdY/edit)


## A Divina Comédia de um Código Legado: indo do Inferno ao Paraíso com Elixir - [Juliana Helena](https://twitter.com/julianahelenaa5)


![A Divina Comédia de um Código Legado: indo do Inferno ao Paraíso com Elixir - Juliana Helena (foto original do <a title="Twitter - Juliana Helena" href="https://twitter.com/julianahelenaa5/status/1132707780132069377" rel="nofollow">twitter dela</a>).](./juliana.jpg)

A Juliana veio de Belo Horizonte para nos contar do case que ela participou no trabalho, em um projeto que tinha código legado.

Assim, foi atrás de encontrar formas de se trabalhar com esse código. Citou o livro [Working Effectively with Legacy Code](https://www.amazon.com/Working-Effectively-Legacy-Michael-Feathers/dp/0131177052) (Trabalhando de forma efetiva com código legado). O autor define código legado simplesmente como **código sem testes**.
E diz que **código sem testes é código ruim**. Com testes conseguimos ter confiança de mudar o comportamento do nosso código. Sem testes não sabemos se nosso código está evoluindo ou regredindo com o passar do tempo.

> Código legado **também** é o código que você acabou de escrever.

É importante manter o **respeito** e entender o **contexto** do código duvidoso que você encontra, não dá pra saber porque aquele código está daquela forma.
Ok, mas você recebeu o problema: e agora, como lidar? A primeira coisa que você pode pensar é: vou reescrever tudo! Você tem duas opções: **refazer** ou **refatorar**, ambas com fatores a se considerar:

- **Refazer**: custo, prazo, manter o legado funcionando em paralelo
- **Refatorar**: começar com pequenas mudanças, ter qualidade em todo novo código e fazer um planejamento para pagar a dívida técnica frequentemente.

Você pode tentar convencer a equipe, evangelizando sobre qualidade de código, explicando sobre escalabilidade e menor custo de correção. Se tudo não funcionar: comece pequeno, mostre seus resultados e, em último caso, se não tiver jeito, mude de emprego.

Falando sobre o case, a Juliana nos explicou como era lá. Assim vamos para a parte 1, **o Inferno**.

### Inferno
Existiam equipes em São Paulo e Belo Horizonte. Várias aplicações antigas e difíceis de escalar. Não havia cultura focada em qualidade de código. Existiam falhas de comunicação e falta de processos (para apagar os incêndios por exemplo). O conhecimento era centralizado em algumas pessoas e não havia muita documentação.

Em resumo:
- Era uma rede de aplicações dependentes e sem testes ou informações precisas sobre o funcionamento.
- Não havia **segurança** para realizar alterações - o que era um pouco suavizado pelo conhecimento da galera.

Porém chegou uma notícia de reestruturação das equipes na empresa e todos os sistemas legados ficaram sob responsabilidade das equipes de BH, que não tinham conhecimento de tudo, já que ele era centralizado em outras equipes. As pessoas com maior conhecimento acabaram indo para outros times. Ela deu algumas sugestões de leitura, como o livro já citado [Working Effectively with Legacy Code](https://www.amazon.com/Working-Effectively-Legacy-Michael-Feathers/dp/0131177052), além do [Refactoring](https://www.amazon.com/Refactoring-Improving-Existing-Addison-Wesley-Signature/dp/0134757599) e o [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship-ebook/dp/B001GSTOAM).

### Purgatório
Para fazer a migração, três **pilares** foram definidos, sendo eles: transferir conhecimento de código não documentado; conseguir manter o funcionamento das aplicações e reestruturar os times.

Houve um processo **pré migração**, que envolveu a definição de uma **equipe de migração**, a divisão dos projetos entre as pessoas; a criação de documentação e aprendizado sobre projeto. Foi necessário entender os processos: quando dava um problema, rodavam um script e tentavam aprender o que acontecia. Além disso, haviam reuniões para compartilhamento de conhecimento e para esclarecimento de dúvidas.

Assim, com tudo definido, ocorreu o processo de migração. Em seguida, ocorreu o processo **pós migração**, com a criação de *squads* e algumas pessoas ajudantes voltando para seus *squads* normais. Foi necessário manter estável o funcionamento dos legados e assim se deu o começo do processo de reestruturação, com a criação de novas aplicações.

#### Por que o Elixir?
Segundo o líder técnico da Juliana, a escolha do Elixir foi para resolver problemas de concorrência e também por ser funcional. Além disso, já existiam alguns cases de sucesso da empresa em Elixir e por isso também já existia um background da equipe.

Assim nasceu o **AppPay**, com qualidade, testes, escalável, desacoplado e seguindo boas práticas.

#### Próximos passos
Evoluir novas aplicações, manter os legados **estáveis** com o mínimo de intervenção possível, até que a maior parte dos legados morra, tendo um processo bem estruturado, qualidade, código escaláveis e eles cheguem no:

### Paraíso
Para se manter no Paraíso, ela diz que é muito importante manter uma boa **comunicação**. Também fazer **1x1 com o gestor/líder técnico** para ter feedbacks precisos e mentoria. Focar em **documentação** é essencial, ela cita inclusive o exemplo do [Swagger](https://petstore.swagger.io/) para documentar APIs. Uma boa prática é a de **code review** (com cuidado na comunicação). É preciso ter foco em **qualidade de código**, com testes e usando inclusive *linters*. São necessários **processos bem definidos**, com cerimônias bem feitas, tarefas bem escritas, prioridades estabelecidas e respeitadas. **Acessibilidade** é algo legal de se pensar desde o início, não sendo necessário esperar surgir uma demanda pra isso.

### Considerações finais
Não existe bala de prata, depende do projeto e tipo de gestão. Tente criar uma cultura de foco em qualidade, que vai evoluindo junto com o time. **Incentive sua comunidade local**, com palestras, espaço físico/coffee breaks, mentoria e open source. **Incentive mulheres, pessoas negras, pessoas LGBTQI+, pessoas trans e pessoas com  deficiência** no seu time, empresa e comunidade. É importante que as empresas/RHs invistam em formação e busca ativa. Também é muito importante deixar as pessoas falarem, respeitar o espaço de fala de cada um.
A Juliana [criou um texto](https://bit.ly/culturadediversidade) sobre como criar uma cultura de diversidade em sua empresa, vale a pena ler!

Para conferir os slides da apresentação, [clique aqui](https://speakerdeck.com/julianahelena5/a-divina-comedia-de-um-codigo-legado-indo-do-inferno-ao-paraiso-com-elixir).


## Primeiros passos com Nerves - Elixir based IoT - [Donato Viana](https://twitter.com/donatoaz)

![Primeiros passos com Nerves - Elixir based IoT - Donato Viana.](./donato.jpg)

Resolvi voltar do almoço e ir para a trilha iniciante, para ver a talk do Donato, que tive oportunidade de conhecer no pós evento do dia anterior. Fiquei interessado para conhecer o Nerves, mesmo sem nunca ter mexido com o [IoT](https://pt.wikipedia.org/wiki/Internet_das_coisas). Ele começa sua talk definindo que Linux embarcado significa que é otimizado e customizado para dispositivos embarcados. Alguns aspectos importantes de dispositivos embarcados: temos recursos limitados (em certos aspectos), há um *overhead* de desenvolvimento - *cross compiling*, *flashing*, etc. e precisamos pensar em atualizações em campo, no dispositivo, que está distante de nós.

### Nerves
É uma plataforma, um framework, um conjunto de ferramentas e um *toolchain* para fazer Elixir Embarcado. Mas, com isso, surge a pergunta: "por que Elixir Embarcado?" - e a resposta é: Por que não? Foi pra isso que a BEAM foi criada, para telecomunicações altamente disponíveis. O mundo real é concorrente: coisas acontecem ao mesmo tempo ou em algum tempo não previsível.

![Como tudo se relaciona em uma aplicação Nerves.](./app_nerves.jpg)

Um **toolchain** é um conjunto de ferramentas para compilar para diversas arquiteturas. **Plataformas** são imagens customizadas, feitas pela comunidade para rodar nos dispositivos. O Fluxo de desenvolvimento, basicamente é: faz o código, compila e empacota o firmware, em seguida o transfere para o dispositivo, testa, corrige bugs e repete.

Entre os pontos fortes estão o **boot rápido**, de segundos; o **tamanho reduzido** (menos de 100mb); a estratégia de **update com imagem inteira**; a estratégia de **fallback com partições A/B** - somente alterando a versão caso funcione; a **robustez ante a perda de energia** (o sistema de arquivos é somente leitura) e **atualizações OTA** (*Over The Air*, igual você provavelmente atualiza seu Android).

> "O Nerves está fazendo para desenvolvimento embarcado e Elixir o que o Rails fez pelo desenvolvimento web e pelo Ruby."
>
> Arto Bendiken

Em seguida o Donato fez um *live coding* mostrando rapidamente como é a cara do framework e como desenvolver algo para o [Raspberry PI](https://www.raspberrypi.org/) dele - no caso, piscar um LED, que ele disse ser o "Hello World" do mundo IoT. Os vídeos da apresentação estão disponíveis no YouTube:

1. [Elixir Nerves - blinky example](https://www.youtube.com/watch?v=PniEVXOYd3g)
2. [Elixir Nerves OTA using uploader script](https://www.youtube.com/watch?v=F-mYpVabptw)
3. [Elixir Nerves ssh and show log](https://www.youtube.com/watch?v=QM9rnAsl95A)

Em seguida, o Donato mostrou pra gente um projeto IoT incrível chamado [Farmbot](https://farm.bot/), vale a pena ver o [vídeo no YouTube](https://www.youtube.com/watch?v=uNkADHZStDE) ou conferir o site.

Os slides da talk estão disponíveis no [SlideShare](https://www.slideshare.net/DonatoAzevedo/primeiros-passos-com-nerves-elixir-para-dispositivos-embarcados).


## Testando no mundo Elixir - [Rafael Rocha](https://twitter.com/RocRafael)

Quando começamos uma estória de usuário, vemos a descrição, os critérios de aceite e começamos a desenvolver. Mas... estamos trazendo as especificações para o código? E quão confiante você fica com a sua entrega? Então, **por que testar**?

Segundo o Rafael, testar ajuda a ter **confiança** sobre suas entregas, ajuda a **organizar** os pensamentos, mantém os **custos baixos** e traz mais **qualidade** para o produto.

### Tipos de teste

Um **Teste de Aceitação** expressa um cenário, é de ponta a ponta, garante mais a qualidade externa e é mais próximo da camada de apresentação - porém é lento. Um **Teste de Integração** fica entre os testes de aceitação e os testes unitários. Um **Teste Unitário** testa o comportamento de uma única unidade do sistema.

![Rafael e a Pirâmide de Testes.](./rafael.jpg)

O Rafael trouxe um exemplo para exercitar testes, mostrando conceitos e implementações. Ele usou uma estratégia de "cebola", de testar em camadas, de fora pra dentro. Para poder entender as camadas, você precisa fazer uma reflexão sobre quais elas são, ajudando na compreensão do problema. Ele mostrou de forma bem rápida como seria o formato de cada um dos testes e o tipo de segurança que aquele teste traz. Ele também ensinou um pouco sobre os **Dublês** de teste, para evitar tocar sistemas externos.

Trouxe ainda o conceito de `Doctests`, explicando que é uma ferramenta para garantir que a nossa documentação esteja válida. Basicamente, você coloca no *docblock* um exemplo de como funcionaria aquela função e pode rodar esse exemplo como código, para ver se o comportamento da função está correto.

O código encontra-se [disponível no GitHub](https://github.com/rafaelrochasilva/greenbox). Um outro recurso legal é o post [Starting with Elixir, the Study Guide](http://blog.plataformatec.com.br/2018/11/starting-with-elixir-the-study-guide/), guia de estudos sobre Elixir escrito pelo próprio Rafael. [Confira os slides](https://speakerdeck.com/rafaelrochasilva/testando-no-mundo-elixir) que incluem o código e os testes feitos de forma mais explicativa.

## Mantendo a Sanidade Testando Estado - [Andrew Rosa](https://twitter.com/_andrewhr)

De volta a trilha avançada, tivemos a talk do Andrew, falando sobre como manter a sanidade testando estado com o conceito de **testes baseados em propriedades**. E para isso, ele utiliza a ferramenta [PropEr](https://jeffkreeftmeijer.com/mix-proper/) com seu código Elixir.

Um simples teste pode ser:

```elixir
test "sorts a list" do
	assert Enum.sort([3, 1, 2]) == [1, 2, 3]
end
```

Esse é um teste onde você informa a lista a ser ordenada, no caso `[3, 1, 2]` e o que esperar exatamente da ordenação, `[1, 2, 3]`. Já, em um **teste de entrada**, você não define uma entrada específica como o exemplo acima (`[3, 1, 2]`), mas pede algumas listas aleatórias para testar o seu código. Por exemplo, `[1]`, `[3, 1, 2, 9, 5]`, `[1, 1, 1, 0]`, `[1, 2]`, `[]`. Você tem alguns geradores que pode usar para gerar dados como esses para testar seu sistema. Para seu teste funcionar agora, é necessário mudar a lógica que ele testa. Como não sabemos qual lista vai vir, ao invés de comparar com uma lista ordenada como antes, agora verificamos se todos os itens estão na ordem após rodar a função de sort. E assim, você roda os seus testes e verifica se a sua função funciona como esperado.

Caso um erro seja encontrado, acontece um ***shrinking***, que tenta encontrar um caso mínimo que quebre o teste, sendo mais fácil de encontrar a razão do problema que levou seu código a estar errado. Por exemplo, pode ser que a lista `[1, 1, 1, 0]` não seja ordenada como o esperado. Com o *shrinking*, podemos descobrir que o menor caso de lista que dê o erro, por exemplo, seja `[1, 0]`. E assim, graças ao teste baseado em propriedades, achamos um erro no nosso código com um caso que não pensamos e assim podemos melhorar ainda mais nossa lógica.

O Andrew mostrou bem didaticamente como fazer vários testes baseados em propriedades com exemplo "reais".

![Andrew Rosa - Mantendo a Sanidade Testando Estado.](./andrew.jpg)

Para ele e sua equipe, o que foi legal é que como muitos testes são gerados, vários *edge cases* foram encontrados sem que eles tenham que ficar pensando sobre encontrá-los manualmente. Porém, como são muitos testes a serem rodados, eles demoram! É necessário saber qual o **retorno de investimento** daquele teste, você não precisa fazer por exemplo para um *CRUD*, mas pode pegar partes sensíveis de seu sistema e submetê-las a testes baseados em propriedades.

**Nota:** Infelizmente, até o momento, os slides da talk ainda não foram postados. Atualizarei o post caso sejam publicados.

## Stand-Up - Em busca do elixir do desenvolvimento - [Rodrigo "pokemaobr" Cardoso](https://twitter.com/pokemaobr)

O grande pokemaobr fez um stand-up na hora do intervalo, levantando risadas da plateia com piadas sobre Elixir e programação em geral.

![Em busca do elixir do desenvolvimento - Pokemaobr](./pokemao.jpg)

## Livestream de Elixir para aumentar a comunidade - [Philip Sampaio](https://twitter.com/philipsampaio)

Na volta do intervalo, agora na trilha iniciante, temos o Philip falando sobre *Live Streaming*. Mas, o que é *Live Streaming*? Basicamente é uma transmissão ao vivo de nossas atividades. Geralmente, pensamos em jogos quando falamos sobre live streaming e provavelmente 98% dos streams são de fato sobre jogos. É fascinante pensar que assistir outros jogadores, ao vivo, é legal, que existe um público bem grande pra isso. E também poder interagir via chat, é algo diferente.

No entanto, algumas pessoas como a [Suz Hinton](https://www.twitch.tv/noopkat) fazem streaming de código e utilizam o a plataforma [Twitch](https://www.twitch.tv/) para isso. Ela fala sobre JavaScript/Node.js, bem como Open Source, acessibilidade e IoT. Ela consegue explicar um tema complicado pra alguém ao vivo, prestar atenção no chat e elaborar um raciocínio complexo ao mesmo tempo - e isso fascinou o Philip.

No final de 2018, o José Valim - criador do Elixir - começou a fazer o mesmo! Eventualmente, ele fazia lives mostrando como resolver problemas do [Advent of Code](https://adventofcode.com/) e foi bem legal para mostrar como resolver com Elixir alguns desses problemas. Pro Philip isso foi incrível pois ele tinha muita curiosidade em saber como o pessoal do Open Source *codava* - e descobriu que não era tão diferente assim 😉. A ideia veio do irmão do Valim, professor que achava que isso poderia ajudar a comunidade.

O live streaming ajuda a entender o fluxo de trabalho da outra pessoa, a pegar alguns truques que aquela pessoa faz... É muito útil para aprender uma nova tecnologia, então é ótimo poder contar com esse tipo de conteúdo para o Elixir. Para os _streamers_ em si também existem vantagens, pois os ajudam a se comunicar de forma mais eficaz, aprendem a dividir a atenção entre o stream e a plateia e também podem resolver problemas em conjunto com outras pessoas.

### E por que você deveria fazer ou participar das *lives*? 
Um dos medos do Philip era: "e se não aparecesse ninguém?". Ele percebeu que **divulgar** nas redes sociais era de grande ajuda e o importante é ajudar pelo menos uma pessoa. "E se eu travasse ou errasse na frente das pessoas?", você pode se perguntar. Ele diz que acontece e que é normal, o dia-a-dia da programação é assim.

Com *live streams* você vai ajudar a comunidade a crescer, vai melhorar muito suas habilidades e também vai se divertir.

O Philip começou com a ideia de dedicar tempo à biblioteca [Floki](https://github.com/philss/floki) que ele criou, um *parser* de `HTML` feito em Elixir. Mas ele também fala sobre outros assuntos como [Live View](https://github.com/phoenixframework/phoenix_live_view), [Ecto](https://github.com/elixir-ecto/ecto) e Elixir básico.

### Como começar?
Ele recomenda utilizar o software [OBS Studio](https://obsproject.com/) para fazer a transmissão.
O OBS faz o stream da tela, possibilita configurar Cenas Ricas, disponibiliza várias configurações para microfone/câmera e é totalmente Open Source!

![Philip, Philip e Philip - Configurando o OBS Studio.](./philip.jpg)

Caso você não tenha câmera, você pode usar seu celular e configurar para usar como uma webcam.

O Philip dá algumas recomendações para quem está a fim de começar: experimentar algumas configurações do OBS, procurar tutoriais no youtube. Antes das lives, faça uma agenda de tópicos a serem falados; faça a configuração de tudo com antecedência; desabilite as notificações do sistema operacional; tenha cuidado com o histórico de comandos do seu terminal; tenha cuidado com segredos em geral e por último, converse com as pessoas do chat - interagir é o mais legal das lives.

Ele mostrou também algumas pessoas que estão fazendo streaming de código. O [MarcoBrunoBR](https://www.twitch.tv/marcobrunobr) é provavelmente o mais famoso e fala sobre JavaScript, frontend e React. O [Ulisses Almeida](https://www.twitch.tv/anizark)  fala sobre Elixir, programação funcional e exercícios de seu livro [Learn Functional Programming with Elixir](https://pragprog.com/book/cdc-elixir/learn-functional-programming-with-elixir). Já a [JessiTRONica](https://www.twitch.tv/jessitronica)  faz lives sobre Ruby, AWS, Pair Programming, entre outras coisas. Também tem o [José Valim](https://www.twitch.tv/josevalim), que já citamos.

Como conclusão, o Philip diz que acredita que *live streamings* podem ser artefatos muito poderosos para fazer a comunidade Elixir crescer no Brasil.

Confira os slides no [SpeakerDeck](https://speakerdeck.com/philss/streaming-de-codigo-elixir-para-aumentar-a-comunidade).

## Mesa redonda com streamers de Elixir - [Philip Sampaio](https://twitter.com/philipsampaio), [Ulisses Almeida](https://twitter.com/ulissesalmeida) e [Geovane Fedrecheski](https://twitter.com/geonnave)

![Mesa redonda com os streamers. Da esquerda para direita: Geovane, Philip e Ulisses.](./mesa_redonda_streamers.jpg)

Na conversa desse mesa redonda, consegui pegar algumas dicas, que compartilho com vocês. Eles ressaltam a diferença vídeo e streaming: stream é mais simples, não necessita de edição e se errar está ok, pode ser uma forma de começar. A ideia para começar é pegar um assunto bem basicão e tentar ir evoluindo ao longo do tempo, percebendo acertos e erros. O **tempo de live** que eles julgam bom é **entre uma hora e uma hora e meia**. Já para **vídeos**, o que funciona são **coisas curtas**, até **uns cinco minutos** cada. Eles comentaram sobre a possibilidade de se usar o YouTube também como plataforma, ao invés do Twitch, que é algo que o Geovane faz.

Outra dica que deram é que o José Valim tem um [curso legal na Pluralsight](https://www.pluralsight.com/courses/meet-elixir) (em inglês) sobre Elixir, Phoenix.

Eles compartilharam a experiência de cada um e responderam diversas perguntas da plateia. Eu tive algumas dúvidas também, então foi difícil conseguir escrever mais. De qualquer forma, foi uma mesa redonda bem legal :)

## Lightning Talks

A organização deu espaço para algumas talks relâmpago - de cinco minutos. Houve uma votaçãozinha e várias pessoas se apresentaram pra falar sobre diversos temas. 

O [Felipe Orlando](https://br.linkedin.com/in/felipeorlando) começou falando sobre como é o processo seletivo dentro das empresas e como conseguir um trampo em Elixir. Mas, o que todo dev elixir tem que ter?

Primeiro, descubra qual é a empresa do seus sonhos, entre na página de vagas e veja quais são os requisitos dessa empresa. Sejam curiosos, pesquisem, estudem, não tenham medo de conhecer coisas novas e nem medo de errar - inclusive nos testes práticos de empresas. Participe sempre de eventos, é muito válido pelo networking e pelo aprendizado.

Em termos de conhecimento técnico, procure saber um pouco de estrutura de dados, algoritmos e coloque o estudo em prática fazendo pequenas aplicações em casa, sem medo de dar certo ou errado. *TDD* é muito importante, é o que vai garantir que a sua aplicação é confiável. Entender o ecossistema do Elixir é importante, fazer testes, ter *CI*, ter *linters*, ter uma boa documentação do código feito. *Clean code* é muito importante, fazer código fácil de entender por outras pessoas. Inglês é primordial, pois permite que você consuma conteúdo na internet e aumente seus conhecimentos. 

E diz também que empresa boa é empresa que responde - se ela não te respondeu, talvez ela não era tão boa. Empresa boa também valoriza diversidade e inclusão.

Honestamente, não consegui acompanhar direito as outras talks relâmpagos, pois acabei tendo a honra de fazer uma talk relâmpago também, de última hora. Falei sobre o [Exercism](https://exercism.io/), uma plataforma opensource para prática de código e mentoria para todos - um lugar legal pra aprender Elixir e Programação Funcional!

Várias comunidades acabaram se apresentando também. Elas estiveram presentes graças a uma iniciativa muito legal de diversidade do evento.

<blockquote class="twitter-tweet" style="margin: 0 auto"><p lang="pt" dir="ltr">No dia da África, estamos fazendo história: <a href="https://twitter.com/AfroPython?ref_src=twsrc%5Etfw">@AfroPython</a> , <a href="https://twitter.com/tecnogueto?ref_src=twsrc%5Etfw">@tecnogueto</a> , <a href="https://twitter.com/perifacode?ref_src=twsrc%5Etfw">@perifacode</a> e <a href="https://twitter.com/afrotechbr?ref_src=twsrc%5Etfw">@afrotechbr</a> participando de grandes eventos. Tecnologia e Diversidade caminham lado a lado<br>Pessoas, são o CENTRO.<br>Não é inclusão. É pertencimento. Esses espaços também são nossos. <a href="https://twitter.com/hashtag/Ubuntu?src=hash&amp;ref_src=twsrc%5Etfw">#Ubuntu</a> ✊🏿 <a href="https://t.co/mMMp5WYcRo">pic.twitter.com/mMMp5WYcRo</a></p>&mdash; AfrotechBR (@afrotechbr) <a href="https://twitter.com/afrotechbr/status/1132366765407854593?ref_src=twsrc%5Etfw">May 25, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## BEAM architecture handbook - [Andrea Leopardi](https://twitter.com/whatyouhide)

Para fechar o evento tivemos o keynote do Andrea, um dos *core commiters* do Elixir já há três anos. Ele usa Elixir no trabalho há um ano. Nessa talk, ele quer dar bastante dicas para quando você for fazer sua aplicação em Elixir e sobre como funciona a BEAM. Começando a partir de um único nó e crescendo para vários. Essa talk também se aplica a Erlang, ele diz.

### Arquitetura de um único nó

Ele começa com a menor unidade de computação: um processo. É uma unidade de isolamento e concorrência (não unidades de separação de código). Por exemplo, um "distribuidor de TCP" que distribui processos para "conexões TCP". Esse é um bom caso de uso para processos. Caso uma conexão caia, ela está isolada e os outras continuam.

![Um "distribuidor de TCP" utilizando processos. Quando uma conexão cai, as outras continuam.](./tcp_acceptor.jpg)

Em outro exemplo, você tem sua conexão e um "connection handler", que se conecta a sua sessão. Como ele se relaciona com a sua sessão? Ela é só um punhado de dados e talvez não devesse estar em um processo separado. Ela poderia ser apenas uma "data structure" dentro do *connection handler*. Ele ressalta que o problema de salvar estado dentro de processos é:

> **Qualquer** processo seu irá *morrer* em **qualquer** dado momento e **todo** o estado deles será *perdido*.

Faça `flush` do estado do processo constantemente, faça o estado ser recalculável (sendo praticamente um cache do estado de verdade ou do cálculo dele) e mantenha isso em mente, que os processos vão morrer.

Evite **impor** arquitetura de processos. 

Separe o estado da estrutura de dados:
```none
                        /-> process
connection data struct----> gen_stage
					    \-> get_statem (machines)
```

Outra dica é prestar atenção à **MailBox** dos processos, pra não ficar sem memória. No exemplo de consumo de mensagens abaixo, é possível cair facilmente nesse problema, pois alguns tipos de mensagens não são consumidas e vão parar na **MailBox**. É algo para se ter em mente.

```elixir
receive do
    :some_message ->
       # ...
    :other_message ->
       # ...
```

Uma forma de lidar com isso é consumindo mensagens desconhecidas, adicionando logs para podermos saber disso e retornando o próprio estado.

Guia de uso de **Árvores de Supervisão**:

# ![Andrea e o <strong>Whiteboard Design</strong> das árvores de supervisão.](./andrea.jpg)

- **Whiteboard Design**: desenhe a árvore de supervisão num quadro branco para que você tenha certeza do que está acontecendo na aplicação.
- **Estratégias**: `one_for_one`, `one_for_all`, `rest_for_one`. Monte árvores de supervisão aninhadas, utilize-se disso. por exemplo, uma árvore de supervisão que tem como filhos, tanto o `cache` como três `workers`. Nenhuma das estratégias funciona bem nesse caso, pois a eventual falha de um desses filhos vai reiniciar coisas de forma errada. Para resolver, o ideal é ter um supervisor dos três `workers`, ficando com o `cache` como irmão. Assim, você pode ter uma estratégia para o supervisor principal (`rest_for_one`) e outra para o supervisor de `workers` (`one_for_one`). Todos os processos deveriam ser supervisionados. Sempre dê nome para os seus supervisores, para ficar mais fácil de debugar em sistemas em produção.
- **Teste de árvores de supervisão**: uma forma de fazer isso é com *Chaos Monkey*. O repositório [ferd/sups](https://github.com/ferd/sups) ajuda fazendo **property based testing** (como citado na talk do Andrew Rosa) para montar um modelo da sua árvore de supervisão.

`Connection Handling` - trabalhamos com serviços externos, fora da nossa rede. Geralmente utilizamos processos para lidarmos com isso. Porém, e se a conexão entre esse processo e o serviço externo cair, o que fazemos?

```none
Seu App ---> Redis Connection -X-> Redis (de verdade)
                              /\ falha de rede, o que fazer?
```

Segundo o Andrea, podemos colocar um *Connection Manager*, que é responsável por lidar com a lógica de reconexão (não deveria ser, por exemplo, a responsabilidade de um supervisor). Em algum ponto sua conexão vai cair e você deve conceber a aplicação com isso em mente, se preparando para os possíveis erros. É raro que você precise de conexões externas o tempo inteiro para sua aplicação funcionar, então podemos usar a abordagem de estar indisponível por um tempo onde realmente utilizamos.

Tente se reconectar a serviços externos, mas não a cada X segundos ou instantaneamente. Use uma estratégia "backoff", que tenta em tempo exponencial e também um pouco randomizado (um pouco de tempo a mais ou a menos em cada tentativa).

**Processos gargalo** são processos que todo o seu sistema depende e que atrasam tudo caso fiquem lentos. Por exemplo, chamadas bloqueantes para o Cache. Então seu cache vai ser um gargalo. Uma tabela `ETS` pode ajudar a resolver esse problema.

![Tabela ETS para lidar com processos gargalo.](./ets_table.jpg)

`Pools` de conexões também podem ser uma solução para esses gargalos, onde através de uma rotação, você acessa os serviços.

**Error Handling**: lide com todos os erros **esperados**. Se algum erro pode acontecer, ele com certeza vai. O Andrea comenta que odeia o termo "Let it crash" que é bastante falado, porque talvez não é entendido como deveria ser entendido. Ele diz que você deve tratar os erros e não usar essa frase como desculpa para lidar com os mesmos. Dê `crash` apenas em erros inesperados ou irrecuperáveis.

### Arquitetura de muitos nós

Frequentemente, o Andrea ouve que o *BEAM* "resolve sistemas distribuidos" e a reação dele é **NÃO**! Para ele, o BEAM é apenas um bom conjunto de ferramentas! Como por exemplo, `send/2`, `Process.monitor/1`, `Node.monitor/2` e o registro de processos `:global`. Ele até brinca:

> to beam or not to beam

Por exemplo para *Data Storage*, devo usar *RDBMS* (como o *Postgres*, *MySQL*) ou uma solução *BEAM* (como o *Riak*)?
Para tomar decisões assim, pense em interoperabilidade, recursos relacionais e na análise de dados. Já para um banco *key/value*, usamos *Redis* ou *ETS/Mnesia*? Replicação é difícil. A abordagem Phoenix por exemplo é a de usar mais de uma solução, como *pg2* + *Redis pub/sub*.

O Andrea ainda explicou sobre **application failovers**: se a minha aplicação falhar, outra aplicação de pé, que estava parada, assume. E sobre **hot-code upgrades** diz que não são tão utilizados e que conflitam com a abordagem de contêineres Docker. Ele diz para nos questionarmos: "Eu realmente preciso disso?" - e que na opinião dele, geralmente não precisamos.
Com *websockets* é mais complicado, mas com *requests* normais é mais tranquilo.

Existem 3 tipos de **requests**: os que ocorrem **no máximo uma vez**, os que ocorrem **pelo menos uma vez** e os que ocorrem **exatamente uma vez**.
Para as requisições que podemos fazer até **no máximo uma vez** não tem muito o que fazer.
É importante ter [idempotência](https://pt.wikipedia.org/wiki/Idempot%C3%AAncia) para *requests* que podem acontecer pelo menos uma vez. Se chamar mais de uma vez, você lida com isso (por exemplo salvar no banco de dados mais de uma vez). **Exatamente uma vez** é o tipo mais caro de *requests*, porque você tem que garantir que eles vão sempre funcionar (por exemplo transações).

### Conclusões

> "Use a ferramenta certa para o trabalho"
>
> Capitão Óbvio

Não tente usar o *BEAM* pra tudo. Você pode usar muitas outras ferramentas e tecnologias mas, se mesmo assim decidir usar, tente seguir as dicas dessa talk. Aprenda sobre **Sistemas distribuídos**. A arquitetura BEAM é **boa**, leve isso com você.

### Recursos
- [Designing for scalability with Erlang/OTP](http://shop.oreilly.com/product/0636920024149.do)
- [https://ferd.ca](https://ferd.ca/)
- [Distributed system for fun and profit](http://book.mixu.net/distsys/index.html)

Confira os slides (lindos demais, desenhados a mão!) da talk do Andrea no [SpeakerDeck](https://speakerdeck.com/whatyouhide/beam-architecture-handbook).

## That's all Folks!

Com isso, chegamos ao fim desse evento maravilhoso. Como já comentei antes, achei incrível o evento sob todos os aspectos.
Fica aqui meus parabéns à organização.

![<a href="https://twitter.com/mjcoffeeholick" rel="nofollow">Alda Rocha</a> e <a href="https://twitter.com/noteu" rel="nofollow">João Britto</a> - os organizadores do Evento. Foto por <a href="https://www.behance.net/gallery/81294793/Elixir-Brasil-2019-Maio-2019" rel="nofollow">Gabi Nascimento</a>.](./organizadores.jpg)

Também deixo meus parabéns para a curadoria de palestrantes do evento e todos os ajudaram de alguma forma. Valeu demais!

<blockquote class="twitter-tweet" style="margin: 0 auto"><p lang="pt" dir="ltr">Não temos palavras pra agradecer a todas as pessoas e empresas que ajudaram a <a href="https://twitter.com/hashtag/ElixirBrasil?src=hash&amp;ref_src=twsrc%5Etfw">#ElixirBrasil</a> acontecer &lt;3 Nos vemos em 2020 <a href="https://t.co/GiY6tq9pxm">pic.twitter.com/GiY6tq9pxm</a></p>&mdash; Elixir Brasil (@elixir_brasil) <a href="https://twitter.com/elixir_brasil/status/1132822827009282049?ref_src=twsrc%5Etfw">May 27, 2019</a></blockquote>

Nos vemos em 2020 - quem sabe com uma talk minha também? 😉
