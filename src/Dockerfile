# Takes around 15-20 minutes to run the first time (depending on your computer)
FROM alpine:3.6

ENV ALPINE_VERSION=3.6 \
  PACKAGES="bash ca-certificates python2 py-setuptools curl"

# Set the PYTHON STUPID UNICODE EOFUBDHSKJOIWEJNOIEFNODKL
ENV PYTHONIOENCODING UTF-8

# Replacing default repositories with edge ones
RUN echo \
  # && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" > /etc/apk/repositories \
  && echo "http://dl-cdn.alpinelinux.org/alpine/v$ALPINE_VERSION/community" >> /etc/apk/repositories
  # && echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories

# Add the packages, with a CDN-breakage fallback if needed
RUN echo \
  && apk add --no-cache $PACKAGES || \
  (sed -i -e 's/dl-cdn/dl-4/g' /etc/apk/repositories && apk add --no-cache $PACKAGES)

# turn back the clock - hacky lmao
RUN echo \
  # && echo "http://dl-cdn.alpinelinux.org/alpine/v$ALPINE_VERSION/main/" > /etc/apk/repositories
  # && echo "@edge-testing http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
  # && echo "@edge-community http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
  # && echo "@edge-main http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \

  # make some useful symlinks that are expected to exist
  RUN echo \
  && if [[ ! -e /usr/bin/python ]];        then ln -sf /usr/bin/python2.7 /usr/bin/python; fi \
  && if [[ ! -e /usr/bin/python-config ]]; then ln -sf /usr/bin/python2.7-config /usr/bin/python-config; fi \
  && if [[ ! -e /usr/bin/easy_install ]];  then ln -sf /usr/bin/easy_install-2.7 /usr/bin/easy_install; fi

# Install and upgrade Pip
RUN echo \
  && easy_install pip \
  && pip install --upgrade pip \
  && if [[ ! -e /usr/bin/pip ]]; then ln -sf /usr/bin/pip2.7 /usr/bin/pip; fi

# Install geos-dev and some other packages for shapely
RUN apk update && apk upgrade && apk add --no-cache --update build-base

# Add GEOS for shapely
RUN echo "http://mirror.leaseweb.com/alpine/edge/testing/" >> /etc/apk/repositories
RUN apk add --no-cache geos-dev

# Install needed packages
# https://github.com/jfloff/alpine-python/issues/24?fbclid=lwAR08KeopkO3ET6hz8iZ6bV0hEljjpHZaKR2bXMZAUjJsKnauzDLflzeTdpTY
RUN set -ex ;\
  echo "@community http://dl-cdn.alpinelinux.org/alpine/v$ALPINE_VERSION/community" >> /etc/apk/repositories ;\
  apk add --no-cache --update \
  openblas-dev@community \
  expat@community \
  ;\
  rm /var/cache/apk/*

# Install numpy and scipy for ml categories
# Takes 5 years to run... building this part as the base image
# It is cached but just in case we're adding this image
# https://gist.github.com/orenitamar/f29fb15db3b0d13178c1c4dd611adce2
# Dmaa split these into separate lines for debugging
RUN apk add --update-cache gcc 
RUN apk add --update-cache gfortran
RUN apk add --update-cache python 
RUN apk add --update-cache python-dev 
RUN apk add --update-cache py-pip 
RUN apk add --update-cache build-base 
RUN apk add --update-cache wget 
RUN apk add --update-cache freetype-dev 
RUN apk add --update-cache libpng-dev 
RUN apk add --update-cache expat
RUN pip install --upgrade pip
RUN pip install numpy scipy gensim

# Install the rest of the packages
COPY requirements.txt /tmp
RUN cd /tmp && pip install -r requirements.txt

WORKDIR /app
COPY . .
RUN ls -l

EXPOSE 5000
CMD ["python", "app.py", "-p"]
