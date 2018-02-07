from flask import Flask,request,url_for,g,render_template
from sqlalchemy import create_engine
import csv
import os
import pandas as pd

mysql_uri = 'mysql://root:2080kk757@localhost:3306/echart_data?charset=utf8'
engine = create_engine(mysql_uri)

with engine.connect() as conn, conn.begin():
    data = pd.read_sql_table('tt', conn)

data_len = data.shape[0]
new_df = data[0:100]
print(new_df.to_html())
#
# app = Flask(__name__)
#
#
# @app.route('/')
# def index():
#     return new_df.to_html()
#
#
# if '__main__' == __name__:
#     app.run(debug=True)