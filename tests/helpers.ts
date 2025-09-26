export function uniqueUser(prefix: string = 'user'){ return `${prefix}_${Date.now()}`; }

export function getTestCredentials() {
	const username = process.env.TEST_USERNAME || uniqueUser('playwright');
	const password = process.env.TEST_PASSWORD || 'P@ssword123';
	return { username, password };
}