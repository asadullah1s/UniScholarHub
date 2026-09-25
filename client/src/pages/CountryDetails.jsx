import { useParams, Navigate } from 'react-router-dom';

export default function CountryDetails() {
  const { id } = useParams();
  return <Navigate to={`/universities/${id}`} replace />;
}
