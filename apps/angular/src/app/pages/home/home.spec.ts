import { Component } from '@angular/core'
import { provideRouter, RouterOutlet } from '@angular/router'
import { render, screen } from '@testing-library/angular'
import userEvent from '@testing-library/user-event'
import { Home } from './home'

@Component({
  standalone: true,
  template: `<router-outlet></router-outlet>`,
  imports: [RouterOutlet],
})
class TestApp {}

@Component({
  standalone: true,
  template: `<p>Dummy page</p>`,
})
class DummyComponent {}

describe('home', () => {
  it('renders the welcome header', async () => {
    await render(Home)

    expect(screen.getByText('Welcome to Angular Playground!')).toBeVisible()
  })

  it('renders router links from router config', async () => {
    await render(Home, {
      providers: [
        provideRouter([
          { path: 'about', component: DummyComponent },
          { path: 'example', component: DummyComponent },
        ]),
      ],
    })

    const links = screen.getAllByRole('link')
    expect(links.map(l => l.textContent?.trim())).toEqual(['/about', '/example'])
  })

  it('navigates to dummy route on click', async () => {
    const user = userEvent.setup()

    await render(TestApp, {
      routes: [
        { path: '', component: Home },
        { path: 'dummy', component: DummyComponent },
      ],
    })

    const dummyLink = await screen.findByRole('link', { name: '/dummy' })
    await user.click(dummyLink)

    expect(await screen.findByText('Dummy page')).toBeInTheDocument()
  })
})
