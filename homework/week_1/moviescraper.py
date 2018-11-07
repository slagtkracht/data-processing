#!/usr/bin/env python
# Name: Rosa Slagt
# Student number: 11040548
"""
This script scrapes IMDB and outputs a CSV file with highest rated movies.
"""

import csv
from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup

TARGET_URL = "https://www.imdb.com/search/title?title_type=feature&release_date=2008-01-01,2018-01-01&num_votes=5000,&sort=user_rating,desc"
BACKUP_HTML = 'movies.html'
OUTPUT_CSV = 'movies.csv'


def extract_movies(dom):
    """
    Extract a list of highest rated movies from DOM (of IMDB page).
    Each movie entry should contain the following fields:
    - Title
    - Rating
    - Year of release (only a number!)
    - Actors/actresses (comma separated if more than one)
    - Runtime (only a number!)
    """

    actors = []
    # a temporary list for the actors per movie
    actors_movie = ''
    title = []
    movies = dom.find_all("a")

    # to find the actors and titles of the movies
    for movie in movies:
        line = movie.get("href")

        # titles are found after the =adv_li_tt
        if "=adv_li_tt" in line:

            # to empty the temporary list of actors
            if len(title) > 0:
                actors.append(actors_movie[:-2])
                actors_movie = ''

            title.append(movie.text)

        # actors are found after the =adv_li_st
        elif "=adv_li_st" in line:
            # to add the actors to the temporary list
            actors_movie += movie.string
            # the actors are seperated with a comma
            actors_movie += ', '

    # to make sure the actors from the last movie are added
    actors.append(actors_movie)

    rating = []
    # ratings are found after div in 'data-value'
    ratings = dom.find_all("div")
    for rates in ratings:
        if 'data-value' in rates.attrs:
            rating.append(rates.attrs['data-value'])

    runtime = []
    # runtime is foun in the class runtime
    runtimes = dom.find_all("span", class_="runtime")
    for minutes in runtimes:
        # to exclude 'min'
        minutes = minutes.string.split(" ")
        minutes = minutes[0].strip("()")
        runtime.append(minutes)

    year = []
    # releaseyear is found in the class lister-item-year
    releaseyear = dom.find_all("span", class_="lister-item-year")

    for years in releaseyear:
        # to make sure it only contains digits
        years = years.string.split(" ")
        years = years[-1].strip("()")
        year.append(years)

    # to return one list with all the seperated lists
    return [title, rating, year, actors, runtime]


def save_csv(outfile, movies):
    """
    Output a CSV file containing highest rated movies.
    """
    writer = csv.writer(outfile)
    writer.writerow(['Title', 'Rating', 'Year', 'Actors', 'Runtime'])

    # the list which contains the info per movie
    for i in range(len(movies[0])):
        # per movie the info
        movies_list = []

        # to add the i-th element of the different lists to the  movies_list
        movies_list.append(movies[0][i])
        movies_list.append(movies[1][i])
        movies_list.append(movies[2][i])
        movies_list.append(movies[3][i])
        movies_list.append(movies[4][i])

        # to write the new list
        writer.writerow(movies_list)


def simple_get(url):
    """
    Attempts to get the content at `url` by making an HTTP GET request.
    If the content-type of response is some kind of HTML/XML, return the
    text content, otherwise return None
    """
    try:
        with closing(get(url, stream=True)) as resp:
            if is_good_response(resp):
                return resp.content
            else:
                return None
    except RequestException as e:
        print('The following error occurred during HTTP GET request to {0} : {1}'.format(url, str(e)))
        return None


def is_good_response(resp):
    """
    Returns true if the response seems to be HTML, false otherwise
    """
    content_type = resp.headers['Content-Type'].lower()
    return (resp.status_code == 200
            and content_type is not None
            and content_type.find('html') > -1)


if __name__ == "__main__":

    # get HTML content at target URL
    html = simple_get(TARGET_URL)

    # save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # parse the HTML file into a DOM representation
    dom = BeautifulSoup(html, 'html.parser')

    # extract the movies (using the function you implemented)
    movies = extract_movies(dom)

    # write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'w', newline='') as output_file:
        save_csv(output_file, movies)