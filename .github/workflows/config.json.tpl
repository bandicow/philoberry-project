
  {
    "name": "${application_name}_frontend",
    "image": "${aws_front_repository}:${tag}",
    "essential": true,
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-region": "${region}",
        "awslogs-stream-prefix": "staging-service",
        "awslogs-group": "awslogs-service-staging-${service_type}"
      }
    },
    "portMappings": [
      {
        "containerPort": ${frontend_container_port},
        "protocol": "tcp"
      }
    ],
    "healthCheck":{
      "command":["CMD-SHELL","curl -f http://localhost:3000 || exit 1"],
      "interval" :30,
      "timeout" :5,
      "retries" :3
    },
    "cpu": 3,
    "environment": [
      {
        "name": "PORT",
        "value": "3000"
      }
    ],
    "mountPoints" : [ {
      "sourceVolume": "philoberry_home",
      "containerPath": "/jenkins_philoberry_home"
    }],
    "memory": 4096,
    "volumesFrom": []
  }
