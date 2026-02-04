import { createRouter, createWebHistory } from 'vue-router';
import AlbumList from '@/components/AlbumList.vue';
import AlbumDetail from '@/components/AlbumDetail.vue';
import AddAlbum from '@/components/AddAlbum.vue';
import EditAlbum from '@/components/EditAlbum.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: AlbumList,
    props: true
  },
  {
    path: '/album/:id',
    name: 'AlbumDetail',
    component: AlbumDetail,
    props: true 
  },
  {
    path: '/addalbum',
    name: 'AddAlbum',
    component: AddAlbum,
    props: true 
  },
  {
    path: '/editalbum/:id',
    name: 'EditAlbum',
    component: EditAlbum,
    props: true 
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router;
