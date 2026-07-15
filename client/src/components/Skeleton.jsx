import './Skeleton.css';

export function SkeletonBlock({ className = '', style }) {
  return <div className={`sk-block ${className}`} style={style} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="sk-card">
      <div className="sk-img" />
      <div className="sk-lines">
        <div className="sk-line sk-line-title" />
        <div className="sk-line sk-line-sub" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 3 }) {
  return (
    <div className="sk-grid">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductPageSkeleton() {
  return (
    <div className="sk-page">
      <div className="sk-page-layout">
        <div className="sk-gallery">
          <div className="sk-main-img" />
          <div className="sk-thumbs">
            <div className="sk-thumb" />
            <div className="sk-thumb" />
            <div className="sk-thumb" />
          </div>
        </div>
        <div className="sk-info">
          <div className="sk-line sk-line-title sk-w80" />
          <div className="sk-line sk-line-sub sk-w40" />
          <div className="sk-line sk-line-price sk-w30" />
          <div className="sk-line sk-line-body sk-w100" />
          <div className="sk-line sk-line-body sk-w60" />
          <div className="sk-line sk-line-body sk-w90" />
          <div className="sk-btn-placeholder" />
        </div>
      </div>
    </div>
  );
}

export function ToteCardSkeleton() {
  return (
    <div className="sk-card">
      <div className="sk-img sk-img-tall" />
      <div className="sk-lines">
        <div className="sk-line sk-line-title" />
        <div className="sk-line sk-line-sub sk-w40" />
        <div className="sk-btn-placeholder sk-btn-short" />
      </div>
    </div>
  );
}

export function SearchResultsSkeleton() {
  return (
    <div className="sk-grid">
      {Array.from({ length: 4 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
