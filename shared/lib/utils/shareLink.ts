export async function shareLink() {
    let error;

    const shareData = {
        title: 'Produse Italiene',
        text: 'Magazin online de produse și cosmetică din Italia!',
        url: window.location.href,
    };

    if (!navigator.share) {
        navigator.clipboard.writeText(shareData.url);
        return;
    }

    try {
        await navigator.share(shareData);
    } catch (error) {
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                error = 'Вы закрыли меню обмена.';
            } else {
                error = 'Ошибка: ' + error.message;
            }
        } else {
            error = 'Произошла неизвестная ошибка';
        }
    }

    if (error) {
        console.error('error', error);
    }

    return { error };
}
