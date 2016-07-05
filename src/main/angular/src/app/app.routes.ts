import { provideRouter, RouterConfig } from '@angular/router'
import { FeedViewComponent } from './feed-view'
import { ChallengePageComponent } from './challenge-page'
import { ChallengeEditorComponent } from './challenge-editor'
import { PlaygroundComponent } from './playground'

const routes: RouterConfig = [
    { path: '', component: FeedViewComponent },
    { path: 'challenge/:challengeId', component: ChallengePageComponent },
    { path: 'challenge/:challengeId/edit', component: ChallengeEditorComponent },
    { path: 'playground', component: PlaygroundComponent }
]

export const AppRoutes = [
    provideRouter(routes)
]