import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SignUp from '@/components/SignUp'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import UserProfile from '@/components/UserProfile'
import TopAlbums from '@/components/TopAlbums'
import TopArtists from '@/components/TopArtists'
import RecentTracks from '@/components/RecentTracks'
import Authenticated from '@/components/Authenticated'
import FavouriteTracks from '@/components/FavouriteTracks'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/favourite_tracks',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile',
      name: 'Profile',
      component: UserProfile
    },
    {
      path: '/top-artists',
      name: 'TopArtists',
      component: TopArtists
    },
    {
      path: '/top-albums',
      name: 'TopAlbums',
      component: TopAlbums
    },
    {
      path: '/recent-tracks',
      name: 'RecentTracks',
      component: RecentTracks
    }
   
  ]
})


