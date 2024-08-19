export const getCommentData = async (
  postId: number,
  cursorId: number | null = null,
) => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comment`,
  );


  try {
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    console.log('API Response Status:', response.status);
    const data = await response.json();
    console.log('API Response Data:', data);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return null;
  }
};
