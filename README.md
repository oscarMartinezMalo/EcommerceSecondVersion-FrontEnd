# EcommerceSecondVersion-FrontEnd
Docker instructions for production

Step to Push Image to dockerHub
    Go to your account on Dockerhub and create a new repository named ommalor/ecommerce-frontend

    In this directory (EcommerceSecondVersion-FrontEnd>) write the next command 

        // docker build -f Dockerfile.prod -t [exampleName(repoName)] .
        // docker tag [localImageName]  [repoName]              // To rename ImageName

       1.- docker build -f Dockerfile.prod -t ecommercefrontend .
       2.- docker tag ecommercefrontend ommalor/ecommerce-frontend

       3.- docker login 

        // docker push [repoName]                               // push image to dockerhub
       4.- docker push ommalor/ecommerce-backend



Step to run project locally
    1.- docker build -f Dockerfile.prod -t ecommercefrontend .
    2.- docker image ls                     //List all images running at the moment

    //     docker run -d --rm -p 4200:80 --name [SomeName] [imageName]
    3.- docker run -d --rm -p 4200:80 --name frontend ecommercefrontend

Open browser localhost:4200


Step to run project locally from DockerHub
    1.- docker run -d --rm -p 4200:80 ommalor/ecommerce-frontend