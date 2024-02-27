from bs4 import BeautifulSoup
import requests


class ImdbShow:
    search_url = 'https://www.imdb.com/find/?q='
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
    }

    def __init__(self, title):
        self.title = title
        self.season_url = f"https://www.imdb.com/title/{title}/episodes/?season="
        self.cast_url = f'https://www.imdb.com/title/{title}/fullcredits'

        self.show_name = None
        self.seasons_count = None

    @classmethod
    def search_for_shows(cls, query):
        req_url = cls.search_url + query
        result = requests.get(req_url, headers=cls.headers)
        soup = BeautifulSoup(result.content, features="html.parser")

        container = soup.find('section', {'data-testid': 'find-results-section-title'})
        ul = container.find('ul', class_='ipc-metadata-list')

        li_elements = ul.find_all('li', class_='find-title-result')

        query_results = []
        for li in li_elements:
            img = li.find('img')['srcset']
            link = li.find('a')['href']
            imdb_id = link.split('/')[2]
            name = li.find('a').text

            details = li.find_all('ul')
            year = details[0].find_all('li')[0].text

            media_type = None
            if len(details[0].find_all('li')) >= 2:
                media_type = details[0].find_all('li')[1].text

            actors = details[1].find('li').text

            if media_type is not None and media_type.lower() == 'tv series':
                query_results.append({
                    'imdb_id': imdb_id,
                    'name': name,
                    'img': img,
                    'year': year,
                    'type': media_type,
                    'actors': actors
                })

        return query_results

    def fetch_show_data(self):
        req_url = self.season_url + '1'
        result = requests.get(req_url, headers=self.headers)
        soup = BeautifulSoup(result.content, features="html.parser")

        h2_element = soup.find_all("h2",  {'data-testid': 'subtitle'})[0]
        self.show_name = h2_element.text

        season_numbers_container = soup.find_all("ul", class_="ipc-tabs ipc-tabs--base ipc-tabs--align-left")[0]
        season_numbers = season_numbers_container.find_all('a')
        seasons_count = season_numbers[-1].text
        self.seasons_count = int(seasons_count)