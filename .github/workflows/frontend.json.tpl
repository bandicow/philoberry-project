[
  {
    "name": "philoberry-repository_frontend",
    "image": "philoberry_front/service_dev:latest",
    "essential": true,
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-region": "ap-northeast-2",
        "awslogs-stream-prefix": "frontend-service",
        "awslogs-group": "awslogs-all-dev"
      }
    },
    "portMappings": [
      {
        "containerPort": 3000,
        "protocol": "tcp"
      }
    ],
    "healthCheck":{
      "command":["CMD-SHELL","curl -f http://localhost:3000/ || exit 1"],
      "interval" :30,
      "timeout" :5,
      "retries" :3
    },
    "cpu": 1,
    "environment": [
      {
        "name": "PORT",
        "value": "3000"
      }
    ],
    "memory": 3072,
    "volumesFrom": []
  }
]