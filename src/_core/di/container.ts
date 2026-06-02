import { container, type DependencyContainer } from 'tsyringe'

export function createAppContainer(): DependencyContainer {
  // Child container prevents leaking registrations across SSR requests.
  return container.createChildContainer()
}

