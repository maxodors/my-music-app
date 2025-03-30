import { Container } from '@mantine/core';
import { ReactNode } from 'react';

const PageContainer = ({ children }: { children: ReactNode }) => {
	return <Container size="xl">{children}</Container>;
};

export default PageContainer;
