# MediaStream Observability

A real-time observability desktop application for monitoring media streaming infrastructure.
Built with Tauri (Rust backend) and React (TypeScript frontend), powered by Prometheus metrics and custom relay telemetry.

This project is just a show case app on how to build an observable platform for desktop
applications.

## About this

This project conatins a frontend for the desktop app in `src/` and a rust backend in `src_tauri`. Rust fetches the metrics and counter from prometheus and provide it to the front-end. A mock js server is available in the `exporter/` which generates the sample time serires data and pushes them to prometheus.

## Setup

```bash
# Clone the repo
git clone https://github.com/your-org/mediastream-observability.git
cd mediastream-observability

# install the deps 
npm install

# run the app 
npm run tauri dev
```

To generate a prometheus sample data and connect to the db, run:

```bash
# Start the prometheus db container
cd infra/
docker compose up -d

# Start the mocke server to create demo telemetry data
# It acts like a telemetry simulator.
node ./exporter/server.js 
```
