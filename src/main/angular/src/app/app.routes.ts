import { provideRouter, RouterConfig } from '@angular/router'
import { FeedViewComponent } from './feed-view'
import { ChallengePageComponent } from './challenge-page'
import { ChallengeEditorComponent } from './challenge-editor'

const routes: RouterConfig = [
    { path: '', component: FeedViewComponent },
    { path: 'challenge/:id', component: ChallengePageComponent },
    { path: 'challenge/:id/edit', component: ChallengeEditorComponent },
]

export const AppRoutes = [
    provideRouter(routes)
]