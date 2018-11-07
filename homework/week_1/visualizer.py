#!/usr/bin/env python
# Name: Rosa Slagt
# Student number: 11040548
"""
This script visualizes data obtained the a .csv file and makes a graphic of it
"""

import csv
import matplotlib.pyplot as plt

# Global constants for the input file, first and last year
INPUT_CSV = "movies.csv"
START_YEAR = 2008
END_YEAR = 2018

# Global dictionary for the data
data_dict = {str(key): [] for key in range(START_YEAR, END_YEAR)}

if __name__ == "__main__":
    # opens the created csv file
    with open(INPUT_CSV, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        #  add rating to dictionary with key [year]
        for row in reader:
            data_dict[row["Year"]].append(float(row["Rating"]))

    x = []
    y = []

    for years in data_dict:
        # calculating the average ratings
        y.append((sum(data_dict[years])) / len(data_dict[years]))
        x.append(years)

# determine to use which data
plt.plot(x, y)

# labeling the axes
plt.ylabel('Average ratings')
plt.xlabel('Years')

plt.show()

