FROM python

WORKDIR /app

COPY . .

RUN pip3 install -r requirements.txt

EXPOSE 80

ENV MONGODB_USERNAME=thecsr
ENV MONGODB_PASSWORD=Woodland143
ENV MONGODB_URL=mongodb

CMD [ "python3", "app.py" ]




