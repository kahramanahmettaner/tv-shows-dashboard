from bs4 import BeautifulSoup
import requests
import time


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

    def fetch_season_data(self, season_number, limit_of_attempts=10):

        # sometimes, the request succeeds, but we don't get season data
        # that's why we need to try to fetch the season data multiple times, in case we don't get it
        # because of this, determine a limit for number of attempts

        if limit_of_attempts <= 0:
            return {"error": "Unable to fetch season data"}, 500

        curr_url = self.season_url + str(season_number)
        result = requests.get(curr_url, headers=self.headers)
        soup_season = BeautifulSoup(result.content, features="html.parser")
        episodes = soup_season.find_all("article", class_="episode-item-wrapper")

        season_info = []
        for _, current_episode in enumerate(episodes):
            img = current_episode.find_all("img")
            episode = current_episode.find_all("h4")
            rating = current_episode.find_all("span", class_="ratingGroup--imdb-rating")
            vote_count = current_episode.find_all("span", class_="ipc-rating-star--voteCount")
            description = current_episode.find_all("div", class_="ipc-html-content-inner-div")

            if len(img) == 0 or len(episode) == 0 or len(rating) == 0 or len(vote_count) == 0 or len(description) == 0:
                print(f"Error: {season_number}. season data not found! ")

            else:
                current_episode_dict = {
                    "image_link": img[0]['srcset'],
                    "episode": episode[0].text,
                    "imdb_rating": rating[0]['aria-label'],
                    "vote_count": vote_count[0].text,
                    "description": description[0].text
                }
                season_info.append(current_episode_dict)

        if len(season_info) == 0:
            print(f"Error: {season_number}. fail! ")

            # Wait a bit to not overload the server with too many requests in a short time period
            time.sleep(2)

            # Call the function recursively until the limit of attempts is achieved
            return self.fetch_season_data(season_number, limit_of_attempts-1)

        print(f"Success: {season_number}")
        return season_info

    def fetch_cast(self):
        result = requests.get(self.cast_url, headers=self.headers)
        soup = BeautifulSoup(result.content, features="html.parser")
        content = soup.find('div', {'id': 'fullcredits_content'})

        # Extract cast, writers and directors from IMDb full credits page
        cast = self.extract_cast(content)
        writers = self.extract_writers(content)
        directors = self.extract_directors(content)

        return {
            'cast': cast,
            'writers': writers,
            'directors': directors
        }

    @staticmethod
    def extract_cast(page_content):
        cast = []
        table_cast = page_content.find('table', class_='cast_list')
        tr_elements = table_cast.find_all('tr')
        for tr in tr_elements:
            td_elements = tr.find_all('td')
            if len(td_elements) == 4:
                td_name = td_elements[1]
                td_character = td_elements[3]

                actor = td_name.find('a').text.replace('\n', '')

                a_elements_character = td_character.find_all('a')

                character = a_elements_character[0].text if len(a_elements_character) >= 1 else None

                character_info = a_elements_character[1].text if len(a_elements_character) >= 2 else None
                episodes_count = character_info.split(',')[0] if character_info is not None else '0 episodes'

                cast.append({
                    'name': actor,
                    'character': character,
                    'episodes_count': episodes_count
                })

        return cast

    @staticmethod
    def extract_writers(page_content):
        writers = []

        h4_writers = page_content.find('h4', {'id': 'writer'})
        table_writers = h4_writers.find_next_sibling('table')
        tr_writers = table_writers.find_all('tr')

        for tr in tr_writers:
            td_name = tr.find('td', class_='name')
            td_detail = tr.find('td', class_='credit')

            name = td_name.find('a').text.replace('\n', '')
            detail = td_detail.text.replace('\n', '')
            writers.append({
                'name': name,
                'episodes_count': detail
            })

        return writers

    @staticmethod
    def extract_directors(page_content):
        directors = []

        h4_directors = page_content.find('h4', {'id': 'director'})
        table_directors = h4_directors.find_next_sibling('table')
        tr_directors = table_directors.find_all('tr')

        for tr in tr_directors:
            td_name = tr.find('td', class_='name')
            td_detail = tr.find('td', class_='credit')

            name = td_name.find('a').text.replace('\n', '')
            detail = td_detail.text.replace('\n', '')
            directors.append({
                'name': name,
                'episodes_count': detail
            })

        return directors
