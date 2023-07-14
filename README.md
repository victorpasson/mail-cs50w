# CS50 - Project 3 - Mail

Repositório que contém o código para a solução do nono projeto do curso CS50. A aplicação consiste em uma empresa de compra e vendas de ações. O objetivo principal do projeto é permitir que os usuários veja a cotação atual, compre ações, venda ações e veja seu histórico de transações. A aplicação foi construída com o Flask framework.

[![Page Wiki Project](https://i.postimg.cc/JnfrdSf6/Dja.png)](https://vvpasson.pythonanywhere.com/login)

## Página do Projeto

O projeto foi disponibilizado para interação por meio do [Python Any Where](https://vvpasson.pythonanywhere.com/login).

Obs.: Por a aplicação estar utilizando uma chave API de teste grátis da IEX Cloud pode ser que quando você tentar fazer a busca por ações pode não funciona - retornará que é inválida - isso ocorre porque a chave grátis tem tempo de duração. Após o tempo de teste gratuito somente pagando para continuar realizando consultas na plataforma da IEX Cloud, o que não é de meu interesse.

## Youtube Vídeo

Um breve vídeo de demonstração do resultado do projeto foi feito e hospedado no [YouTube](https://youtu.be/2v3xc0ACs0s).

## Especificações do projeto

1.	**Registro**: complete a implementação de *register* de forma que um usuário consiga se registrar por meio de um *form*.
	* O usuário deve fornecer uma entrada de *username* por meio de um *text field*, no qual o *name* é *username*. Caso o campo seja deixado em branco ou o usuário já exista, deve retornar uma mensagem;
	* Deve ter como *input* também uma senha, implemente isso com um *text field* com *name* de *password* e então faça um campo igual para a confirmação, cujo *name* será *confirmation*. Retorne uma mensagem caso o campo seja deixado em branco ou as senhas não correspondam;
	* Submeta as entradas do usuário via *POST* para */register*;
	* Insira o novo usuário no banco de dados *users*, mas não armazene a senha do usuário propriamente, mas uma *hash* da senha.
	
	Após implementar *register* corretamente, você deve estar habilitado a registrar uma conta e logar.

2.	**Cotação**: complete a implementação de *quote* de forma que permita a um usuário verificar o preço corrente de uma ação.
	* O usuário deve fornecer o símbolo da ação e será retornado o preço atual da ação;

3.	**Compra**: complete a implementação de *buy* de forma que permita a um usuário comprar uma ação.
	* O usuário deve fornecer o símbolo da ação e a quantidade;
	* Se certifique de que o símbolo exista e a quantidade não é negativa, caso algum desses dois ocorra, retorne uma mensagem ao usuário;
	* Além disso, você deve se certificar de que o usuário tenha fundos para isso, caso ele não tenha o dinheiro suficiente para adquirir a quantidade de ação a um determinado preço, não deve completar a compra e deverá ser retornada uma mensagem ao usuário.
	
	Após implementar *buy* corretamente, deve ser possível ver como se encontra a carteira do usuário.

4.	**Venda**: complete a implementação de *sell* de forma que permita a um usuário vender uma ação.
	* O usuário deve fornecer o símbolo da ação e a quantidade. No entanto, só deve ser possível vender ações que estão na sua carteira;
	* Retorne uma mensagem ao usuário caso a quantidade seja negativa, zero ou não tenha aquela quantidade em carteira para vender.

5.	**Histórico**: complete a implementação de *history* de forma que permita a um usuário ver um resume das suas transações, ou seja, o que vendeu e o que comprou.
	* Em cada linha deixe claro se uma ação foi comprada ou vendida, incluindo o símbolo, o preço, a quantidade e a data de quando a transação ocorreu.

6.	**Toque pessoal**: dê um toque pessoal a aplicação.
