import FirstSection from '../components/sections/FirstSection';
import StorySection from '../components/sections/StorySection';
import ProfileSection from '../components/sections/ProfileSection';
import ContentSection from '../components/sections/ContentSection';
import LinkSection from '../components/sections/LinkSection';

export default [
  {
    id:       'first',
    title:    'ファーストビュー',
    component: FirstSection,           // セクション固有コンポーネント
    motion:   { /* Framer Motion の variants など */ },
    styles:   { /* セクション固有スタイルをオーバーライド */ },
    camera: 'camera1'
  },
  {
    id:       'story',
    title:    'ストーリー',
    component: StorySection,
    motion:   { /* ... */ },
    camera: 'camera2'
  },
  {
    id:       'profile',
    title:    'プロフィール',
    component: ProfileSection,
    motion:   { /* ... */ },
    camera: 'camera3'
  },
  {
    id:       'content',
    title:    'コンテンツ',
    component: ContentSection,
    motion:   { /* ... */ },
    camera: 'camera4'
  },
  {
    id:       'link',
    title:    'リンク',
    component: LinkSection,
    motion:   { /* ... */ },
    camera: 'camera5'
  }
];
