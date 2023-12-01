

{
  "family": "backend-staging-dev",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "1024",
  "memory": "2048",
  "containerDefinitions": [
    {
      "name": "${application_name}_express",
      "image": "${aws_express_repository}:${tag}",
      "essential": true,
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-region": "${region}",
          "awslogs-stream-prefix": "express-service",
          "awslogs-group": "awslogs-all-${service_type}"
        }
      },
      "portMappings": [
        {
          "containerPort": ${express_container_port},
          "protocol": "tcp"
        }
      ],
      "healthCheck":{
        "command":["CMD-SHELL","curl -f http://localhost:8000/healthcheck || exit 1"],
        "interval" :30,
        "timeout" :5,
        "retries" :3
      },
      "mountPoints": [],
      "volumesFrom": []
    }
  ]
}