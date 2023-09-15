# CS50W - Project 3 - Mail

Repositório que contém o código para a solução do quarto projeto do curso CS50W. A aplicação consiste em um gerenciador de e-mail fake. O objetivo principal do projeto  é permitir que os usuários se registrem, façam login, vejam sua caixa principal, enviem, arquivem e vejam os emails enviados. A aplicação foi construída com o Django framework.

[![Page Mail Project](https://i.postimg.cc/MZBC3pGJ/Dja.png)](https://jvpasson.pythonanywhere.com/)

## Página do Projeto

O projeto foi disponibilizado para interação por meio do [Python Any Where](https://jvpasson.pythonanywhere.com/).

## Youtube Vídeo

Um breve vídeo de demonstração do resultado do projeto foi feito e hospedado no [YouTube](https://youtu.be/VJNak3T9u4I).

## Especificações do Projeto

Usando JavaScript, HTML e CSS, complete a implementação de um client de email no arquivo *inbox.js*. Você deve cumprir os seguintes requisitos:

1.	**Envio de Email**: quando o usuário submeter um formulário com destinatário, assunto e conteúdo, adicione o código JavaScript para enviar o e-mail.
	* Você pode querer fazer uma requisição do tipo *POST*, passando valores para *recipients*, *subject* e *body*;
	* Uma vez que o e-mail foi enviado, carregue a caixa de emails enviados.

2.	**Caixa de Email**: quando um usuário visitar sua *inbox*, *eviados* ou *arquivados*, carregue a caixa de correio adequada.
	* Você pode querer fazer uma requisição do tipo *GET* para */emails/<mailbox>* para receber os e-mails de uma caixa de correios particular (recebidos, enviados ou arquivados);
	* Quando uma caixa de correio é visitada, a aplicação deve primeiro ter a query para a API pra os últimos emails daquela caixa;
	* Quando uma caixa de correio é visitada, o nome da caixa deve aparecer no topo da página (essa parte foi feita para você);
	* Cada e-mail deve ser renderizado na sua própria box (i.e com uma *div* com bordas) que exibe de quem o e-mail veio, qual o assunto e a data;
	* Se o e-mail não foi lido ainda, ele deve aparecer com um fundo branco. Se o e-mail já foi lido, deve aparecer com um fundo cinza.

3.	**Ver Email**: quando o usuário clicar em algum e-mail, ele deve ser levado para uma view que exibe o conteúdo do e-mail.
	* Você pode querer uma requisição do tipo *GET* para */emails/<email_id>* para solicitar o e-mail;
	* A aplicação deve exibir nessa página: remetente, destinatário, assunto, data e o conteúdo;
	* Você pode querer adicionar uma *div* em *inbox.html* (além de *emails-view* e *composse-view*) para exibir o e-mail. Certifique-se de atualizar seu código para ocultar e exibir a visualização correta quando determinada opção é selecionada;
	* Uma vez que o e-mail foi clicado, você deve marcar o e-mail como lido. Veja que você pode enviar uma requisição do tipo *PUT* para */emails/<email_id>* para atualizar se um e-mail foi lido ou não.
	
4.	**Arquivar/Desarquivar**: permita a um usuário arquivar e desarquivar emails recebidos.
	* Quando visualizar a caixa de emails, cada e-mail da lista deve ser apresentado com um botão permita ao usuário arquivar o email. Quando ver os emails arquivados, o usuário deve ver a opção de desarquivar. Essa opção não se aplica a emails na caixa de enviados;
	* Relembre que você pode enviar uma requisição do tipo *PUT* para */emails/<email_id>* para marcar um e-mail como arquivado ou desarquivado;
	* Uma vez que um e-mail foi arquivado ou desarquivado, carregue a inbox do usuário.

5.	**Responder**: permita a um usuário responder um e-mail.
	* Quando estiver vendo um e-mail particular, ao usuário deve ser apresentado um botão “Responder” que permitirá responder o e-mail;
	* Quando o usuário clica em responder, ele deve ser levado para o formulário de composição de e-mail;
	* Pré-preencha o formulário de composição com o campo de destinatário definido para quem enviou o e-mail original;
	* Pré-preencha o assunto. Se o email original possui um assunto como “foo”, o novo assunto deve ser “Re: foo”. (Se o assunto já estiver preenchido com “Re: ”, não precisa ser preenchido novamente.);
	* Pré-preencha o conteúdo do e-mail com uma linha como “On Jan 1 2020, 12:00 AM foo@example.com wrote:” seguido pelo texto do e-mail original.
