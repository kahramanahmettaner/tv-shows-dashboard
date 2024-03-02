from bs4 import BeautifulSoup
import requests


class ImdbShow:
    search_url = 'https://www.imdb.com/find/?q='
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'
    }

    def __init__(self, imdb_id):
        self.imdb_id = imdb_id
        self.season_url = f"https://www.imdb.com/title/{imdb_id}/episodes/?season="
        self.cast_url = f'https://www.imdb.com/title/{imdb_id}/fullcredits'

        self.show_name = None
        self.seasons_count = None

    @classmethod
    def search_for_shows(cls, show_name):
        req_url = cls.search_url + show_name
        result = requests.get(req_url, headers=cls.headers)
        soup = BeautifulSoup(result.content, features="html.parser")

        container = soup.find('section', {'data-testid': 'find-results-section-title'})
        ul = container.find('ul', class_='ipc-metadata-list')

        li_elements = ul.find_all('li', class_='find-title-result')

        shows = []
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
                shows.append({
                    'imdb_id': imdb_id,
                    'name': name,
                    'img': img,
                    'year': year,
                    'type': media_type,
                    'actors': actors
                })

        return shows

    def parse_show_name(self, soup):
        try:
            h2_element = soup.find_all("h2",  {'data-testid': 'subtitle'})[0]
            self.show_name = h2_element.text
        except Exception as e:
            raise Exception("Error parsing show name:", e)

    def parse_seasons_count(self, soup):
        try:
            season_numbers_container = soup.find_all("ul", class_="ipc-tabs ipc-tabs--base ipc-tabs--align-left")[0]
            season_numbers = season_numbers_container.find_all('a')
            seasons_count = season_numbers[-1].text
            self.seasons_count = int(seasons_count)
        except Exception as e:
            raise Exception("Error parsing seasons count:", e)

    def fetch_show_data(self):
        try:
            req_url = self.season_url + '1'
            result = requests.get(req_url, headers=self.headers)
            result.raise_for_status()  # Raises an exception for 4xx or 5xx status codes
            soup = BeautifulSoup(result.content, features="html.parser")

            self.parse_seasons_count(soup)
            self.parse_show_name(soup)

        except requests.RequestException as e:
            # Check if the exception is an HTTPError
            if isinstance(e, requests.HTTPError):
                # If it is, raise an exception with the error message including the error type and status code
                raise Exception(f"Error fetching show data: HTTPError {e.response.status_code}")
            else:
                # If it's not an HTTPError, raise an exception with just the error type
                raise Exception("Error fetching show data: " + type(e).__name__)

            # to send also the error message from imdb
            # raise Exception("Error fetching show data:", e)

        except Exception as e:
            raise Exception("An unexpected error occurred:", e)
