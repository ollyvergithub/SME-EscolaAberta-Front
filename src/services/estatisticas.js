const API_EOL = process.env.REACT_APP_API_EOL

export async function listarModalidades(params) {
  const { codesc = '' } = params;
  return fetch(`${API_EOL}/modalidades/${codesc}`).then(modalidades =>
    modalidades.json()
  );
}
