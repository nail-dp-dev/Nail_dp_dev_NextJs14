export const postCloneArchiveCreate = async (archiveId: number) => {
    
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/archive/copy`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ archiveId }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      console.error('Network error or invalid JSON:', error);
    } else if (
      error instanceof Error &&
      error.message.startsWith('HTTP error!')
    ) {
      console.error('Server returned an error response:', error);
    } else {
      console.error('Unexpected error:', error);
    }
  }
};
