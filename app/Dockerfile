FROM my-angular-env

COPY . /app

WORKDIR /app

RUN yarn install && yarn build

RUN echo "BUILD FILES" && echo "========================================================================================="
RUN ls -ltr dist
