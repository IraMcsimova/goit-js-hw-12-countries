import { notice, defaultModules } from '@pnotify/core';
import * as PNotifyDesktop from '@pnotify/desktop';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export default function fetchCountries(searchQuery) {
    return fetch(`https://restcountries.com/v2/name/${searchQuery}`).then(response => {
      return response.json()
    }).then(data => {
        if (data.status === 404) {
          throw new Error(data.status)
        } else {
            return data
      }
  });



}
