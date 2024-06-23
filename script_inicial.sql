INSERT INTO "public"."graph_types" ("id", "name", "graph_data_types_option", "number_of_variables", "ordered") VALUES
(1, 'colunas simples', 'categoric', 'single', NULL);
INSERT INTO "public"."graph_types" ("id", "name", "graph_data_types_option", "number_of_variables", "ordered") VALUES
(2, 'colunas agrupadas', 'categoric', 'multiple', NULL);
INSERT INTO "public"."graph_types" ("id", "name", "graph_data_types_option", "number_of_variables", "ordered") VALUES
(3, 'colunas empilhadas', 'categoric', 'multiple', NULL);
INSERT INTO "public"."graph_types" ("id", "name", "graph_data_types_option", "number_of_variables", "ordered") VALUES
(4, 'barras simples', 'categoric', 'single', NULL),
(5, 'barras agrupadas', 'categoric', 'multiple', NULL),
(6, 'barras empilhadas', 'categoric', 'multiple', NULL);
INSERT INTO "public"."question_group" ("id", "topic") VALUES
(1, 'graph_basic_infos');
INSERT INTO "public"."question_group" ("id", "topic") VALUES
(3, 'title');
INSERT INTO "public"."question_group" ("id", "topic") VALUES
(4, 'graph_type');
INSERT INTO "public"."question_group" ("id", "topic") VALUES
(5, 'eixo'),
(6, 'nome_do_topic');
INSERT INTO "public"."question" ("id", "text", "question_group_id", "is_first_question") VALUES
(2, 'Preencha abaixo os dados relacionados as variáveis do seu gráfico no seguinte formato: Gênero, Nome, Ordenada, Tipo, Agregador. Como no exemplo: Categórica, Cor Favorita, N/A, Nominal, Contador. Onde Gênero pode ser Numérico, Categórico ou Temporal. Nome: o nome da variável no gráfico. Ordenada: Crescente, Decrescente, Não, N/A. Tipo: Discreta, Contínua, Nominal, Ordinal. Agregador: Contador, Proporção, N/A', 1, 't');
INSERT INTO "public"."question" ("id", "text", "question_group_id", "is_first_question") VALUES
(3, 'Sua visualização tem um título?', 3, 't');
INSERT INTO "public"."question" ("id", "text", "question_group_id", "is_first_question") VALUES
(4, 'Qual o título do seu gráfico?', 3, 'f');
INSERT INTO "public"."question" ("id", "text", "question_group_id", "is_first_question") VALUES
(6, 'O seu titulo é geral ou traz uma mensagem específica?', 3, 'f'),
(7, 'A mensagem reflete o que está sendo comunicado pelo gráfico?', 3, 'f'),
(9, 'Qual o tipo  da sua visualização?', 4, 't'),
(10, 'O eixo Y começa em qual unidade?', 5, 't'),
(11, 'Como é o intervalo entre os dos eixos?', 5, 'f');
INSERT INTO "public"."option" ("id", "text", "question_id", "type") VALUES
(3, 'Sim', 3, 'singleSelect');
INSERT INTO "public"."option" ("id", "text", "question_id", "type") VALUES
(4, 'Não', 3, 'singleSelect');
INSERT INTO "public"."option" ("id", "text", "question_id", "type") VALUES
(14, 'N/A', 6, 'singleSelect');
INSERT INTO "public"."option" ("id", "text", "question_id", "type") VALUES
(15, 'Sim', 7, 'singleSelect'),
(16, 'Não', 7, 'singleSelect'),
(17, 'N/A', 7, 'singleSelect'),
(12, 'Geral', 6, 'singleSelect'),
(13, 'Específico', 6, 'singleSelect'),
(20, 'colunas simples', 9, 'singleSelect'),
(21, 'colunas agrupadas', 9, 'singleSelect'),
(22, 'colunas empilhadas', 9, 'singleSelect'),
(23, 'barras simples', 9, 'singleSelect'),
(24, 'barras agrupadas', 9, 'singleSelect'),
(25, 'barras empilhadas', 9, 'singleSelect'),
(29, 'Variado', 11, 'singleSelect'),
(28, 'Proporcional', 11, 'singleSelect'),
(2, '', 2, 'bigText'),
(27, '', 10, 'number'),
(7, '', 4, 'text');
INSERT INTO "public"."navigation_rule" ("id", "rule", "question_id", "option_id") VALUES
(11, '{ "action": "saveTitleVariableType", "handleNext": {"question_id": 7 }  }', 6, 13);
INSERT INTO "public"."navigation_rule" ("id", "rule", "question_id", "option_id") VALUES
(12, '{ "handleNext": {"question_id": 7}  }', 6, 14);
INSERT INTO "public"."navigation_rule" ("id", "rule", "question_id", "option_id") VALUES
(4, '{ "action": "saveTitle", "handleNext": { "question_id": 6 } }', 4, 7);
INSERT INTO "public"."navigation_rule" ("id", "rule", "question_id", "option_id") VALUES
(3, '{ "handleNext": {"question_id": 4 } }', 3, 3),
(10, '{ "action": "saveTitleVariableType"  }', 6, 12),
(2, '{ "action": "saveGraphData", "handleNext": { "question_group_id": 4 } }', 2, 2),
(1, '{ "action": "handleSaveGraphType",  "handleNext": {"question_group_id": 5}  }', 9, 20),
(13, '{ "handleNext": { "question_id": 11 } }', 10, 27),
(14, '{ "handleNext": { "question_group_id": 3 } }', 11, NULL);
INSERT INTO "public"."feedback" ("id", "text", "option_id", "after_question", "question_id") VALUES
(1, 'É importante que seu gráfico tenha um título', 4, 't', NULL);
INSERT INTO "public"."feedback" ("id", "text", "option_id", "after_question", "question_id") VALUES
(2, 'É recomendável que o eixo Y comece em zero ao usar a codificação de altura ou comprimento, para não enfatizar demais a diferença entre os valores e para garantir que o leitor possa fazer comparações na proporção exata.
Quando se usa outra codificação, isso não é necessário.', 27, 't', 10);
INSERT INTO "public"."references" ("id", "author", "title", "DOI", "url", "citation") VALUES
(2, 'Alberto Cairo', 'How Charts Lie: Getting Smarter about Visual Information', NULL, NULL, '(Cairo, 2019)');
INSERT INTO "public"."references" ("id", "author", "title", "DOI", "url", "citation") VALUES
(4, 'Michael Correll, Enrico Bertini, and Steven Franconeri', 'Truncating the Y-Axis: Threat or Menace?', '10.1145/3313831.3376222', NULL, '(Correll et. al, 2020)');
INSERT INTO "public"."_feedbackToreferences" ("A", "B") VALUES
(2, 2);
INSERT INTO "public"."_feedbackToreferences" ("A", "B") VALUES
(2, 4);
