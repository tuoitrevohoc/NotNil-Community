import { Routes, Route } from '@angular/router'
import { NewChallengeComponent } from './new-challenge.component'
import { FeedComponent } from './feed.component'

export const applicationRoutes = [
  { path: '/', component: FeedComponent },
  { path: '/new-post', component: NewChallengeComponent }
];