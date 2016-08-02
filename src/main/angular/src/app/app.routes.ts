import { provideRouter, RouterConfig } from '@angular/router'
import { FeedViewComponent } from './feed-view'
import { ChallengePageComponent } from './challenge-page'
import { ChallengeEditorComponent } from './challenge-editor'
import { PlaygroundComponent } from './playground'
import { PathBrowserComponent } from './path-browser'
import { PathEditorComponent } from './path-editor'

const routes: RouterConfig = [
    { path: '', component: FeedViewComponent },
    { path: 'challenge/:challengeId', component: ChallengePageComponent },
    { path: 'challenge/:challengeId/edit', component: ChallengeEditorComponent },
    { path: 'play/:playId', component: PlaygroundComponent },
    { path: 'play', component: PlaygroundComponent },
    { path: 'path', component: PathBrowserComponent },
    { path: 'path/new', component: PathEditorComponent }
]

export const AppRoutes = [
    provideRouter(routes)
]