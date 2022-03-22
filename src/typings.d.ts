declare var process: Process;

interface Process {
  env: Env
}

interface Env {
  USERNAME: string
}

interface GlobalEnvironment {
  process: Process
}
