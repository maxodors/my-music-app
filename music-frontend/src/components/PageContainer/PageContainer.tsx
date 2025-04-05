import { Container } from '@mantine/core';
import { ReactNode } from 'react';

const PageContainer = ({ children }: { children: ReactNode }) => {
	return (
		<Container
			size="xl"
			h={'100vh'}
			p={16}
			style={{
				display: 'flex',
				flexDirection: 'column',
				rowGap: '16px',
			}}>
			{children}
		</Container>
	);
};

export default PageContainer;
