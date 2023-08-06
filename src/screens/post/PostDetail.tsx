import WebViewContainer from '@/components/WebViewContainer';
import { DEFAULT_TARGET_URL } from '@/constants';
import { type CommonScreenProps } from '@/types';

const PostDetail = ({ navigation, route }: CommonScreenProps) => {
  // @ts-ignore
  const slug = route.params?.pathname ?? '';
  if (slug.length < 1) {
    navigation.reset({ index: 0, routes: [{ name: 'Drawer' }] });
  }

  const Component = WebViewContainer('Detail', `${DEFAULT_TARGET_URL}/${slug}`);
  return <Component />;
};

export default PostDetail;
