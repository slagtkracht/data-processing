# Exploratory Data Analysis
# Rosa Slagt
# 11040548

import csv
import pandas as pd
from bs4 import BeautifulSoup
from collections import OrderedDict
import matplotlib.pyplot as plt
import json


# import csv file
INPUT_CSV = "input.csv"

def reading_csv(INPUT_CSV):

    # making lists for the data
    name = []
    region = []
    pop_density = []
    infant_mortality = []
    gdp = []

    with open(INPUT_CSV) as csvfile:
        reader = csv.DictReader(csvfile)

        # for not adding unvalid data to the lists
        flag = False

        for row in reader:
            flag = False

            # removing unvalid values
            if row["Region"] is '' or "unknown" in row["Region"]:
                flag = True

            if row["Pop. Density (per sq. mi.)"] is '' or "unknown" in row["Pop. Density (per sq. mi.)"]:
                flag = True

            if row["Infant mortality (per 1000 births)"] is '' or "unknown" in row["Infant mortality (per 1000 births)"]:
                flag = True

            if row["GDP ($ per capita) dollars"] is '' or 'unknown' in row["GDP ($ per capita) dollars"]:
                flag = True

            # adding the correct datavalues
            if not flag:
                name.append(row["Country"])
                region.append(row["Region"])
                pop_density.append(row["Pop. Density (per sq. mi.)"])
                infant_mortality.append(row["Infant mortality (per 1000 births)"])
                gdp.append(row["GDP ($ per capita) dollars"])

    return [name, region, pop_density, infant_mortality, gdp]


def central_tendency (data):
    gdp_list = []

    # remove 'dollar'
    for row in data[4]:
        money = row.split(' ')
        # to be able to calculate the Central Tendencies a float is needed
        gdp_list.append(float(money[0]))

    # making panda dataframework
    gdp_data = pd.DataFrame(gdp_list)

    # calculating for Central Tendency
    gdp_mean = gdp_data.mean()
    gdp_median = gdp_data.median()
    gdp_mode = gdp_data.mode()
    gdp_std = gdp_data.std()

    return gdp_data

def histogram(data):
    gdp_data = central_tendency(data)

    # removing outliners that are more than 3 times the std
    good_data = gdp_data[gdp_data < (gdp_data.mean() + 3 * gdp_data.std())]

    # making a histogram
    pd.to_numeric(good_data[0]).hist(bins = 100)
    plt.suptitle('Distribution GDP in dollars per capita)')
    plt.title("Rosa Slagt, 2018")
    plt.ylabel('Absolute amount')
    plt.xlabel('GDP ($ per capita)')
    plt.ylim(bottom = 0)
    plt.xlim(left = 0)
    plt.show()


def mortality(data):
    mortality_list = []

    for row in data[3]:
        mortality_list.append(float(row.replace(',', '.')))

    return mortality_list


def boxplot(data):

    # reading the mortality
    mort = mortality(data)
    df = pd.DataFrame(mort)

    # plot boxplot
    df.plot.box()
    plt.title('Rosa Slagt, 2018')
    plt.suptitle('Infant mortality (per 1000 births)')
    plt.show()


def toJSON(data):
    result = {}

    for i in range(len(data[0])):
        result[data[0][i].strip()] = {"Region" : data[1][i].strip(), "Pop. Density (per sq. mi.)" : data[2][i],
                                      "Infant mortality (per 1000 births)" : data[3][i],
                                      "GDP ($ per capita) dollars" : data[4][i]}

    with open('data.json', 'w') as outfile:
        json.dump(result, outfile)



if __name__ == "__main__":
    data = reading_csv(INPUT_CSV)
    histogram(data)
    boxplot(data)
    toJSON(data)






