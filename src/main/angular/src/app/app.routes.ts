import { provideRouter, RouterConfig } from '@angular/router'
import { FeedViewComponent } from './feed-view'
import { ChallengePageComponent } from './challenge-page'

const routes: RouterConfig = [
    { path: '', component: FeedViewComponent },
    { path: 'challenge/:id', component: ChallengePageComponent },
]

export const AppRoutes = [
    provideRouter(routes)
]