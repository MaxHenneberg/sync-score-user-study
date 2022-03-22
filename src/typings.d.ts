declare var process: Process;

interface Process {
  env: Env
}

interface Env {
  MY_TEST_VAR: string
}

interface GlobalEnvironment {
  process: Process
}
