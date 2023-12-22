[
  {
    "name": "philoberry-repository_express",
    "image": "philoberry_express/service_dev:latest",
    "essential": true,
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-region": "ap-northeast-2",
        "awslogs-stream-prefix": "express-service",
        "awslogs-group": "awslogs-all-dev"
      }
    },
    "portMappings": [
      {
        "containerPort": 8000,
        "protocol": "tcp"
      }
    ],
    "healthCheck":{
      "command":["CMD-SHELL","curl -f http://localhost:8000/healthcheck || exit 1"],
      "interval" :30,
      "timeout" :5,
      "retries" :3
    },
    "cpu": 1,
    "mountPoints": [],
    "memory": 1024,
    "volumesFrom": []
  }
]