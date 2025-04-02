import { Center, Loader } from '@mantine/core';

const ContentLoader = () => {
	return (
		<Center h={'85%'}>
			<Loader color="blue" size="xl" type="bars" />
		</Center>
	);
};

export default ContentLoader;
