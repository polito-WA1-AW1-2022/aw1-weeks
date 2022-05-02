# Esempio con funzionalita' di edit

Rispetto alla settimana precedente:
- i componenti sono stati riorganizzati in 2 files
- il form ora gestisce l'evento onSubmit per la sottomissione, che tra l'altro consente di sottomettere il form anche con il tasto **invio**
- la validazione del form e', fatta, a titolo di esempio, su condizioni non facilmente gestibili solamente in html5 (es. contenuto dei campi di testo: codice senza spazi, data che non sia futura)

Riguardo l'**editing**:
- per effettuare l'edit, viene usato uno **stato temporaneo** `examToEdit` che contiene le informazioni per popolare i campi del form
- l'inizializzazione dello stato del form verifica se `examToEdit`, passato come props, e' impostato, e lo usa come inizializzazione
- per fare in modo che i bottoni di edit funzionino anche a form aperto, e' necessario dire a React che il componente va ricreato: cio' e' fatto cambiando l'attributo `key` del form, introdotto esclusivamente a questo scopo

