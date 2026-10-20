<template>
  <PortfolioPageShell>
    <PortfolioSubNav back-to="/private" back-label="‹ Private" />
    <div class="travel-wrap">

    <!-- 標籤列 -->
    <div class="tab-bar">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-btn"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        {{ tab.label }}
      </button>
    </div>

    <!-- 名古屋 -->
    <div v-if="activeTab === 'nagoya'">

    <!-- 封面 -->
    <div class="cover">
      <img class="cover-photo" src="https://images.unsplash.com/photo-1747546314703-6c4fc20c5a37?q=80&w=1600&auto=format&fit=crop" alt="Nagoya Castle under a clear blue sky" />
      <div class="cover-scrim" />
      <div class="cover-content">
        <div class="cover-sub">Travel Guide 2026</div>
        <h1 class="cover-title">日本旅遊手冊</h1>
        <div class="cover-dates">2026 年 6 月 18 日出發</div>
        <div class="cover-cities">
          <span class="city-tag">✈ 關西機場</span>
          <span class="city-tag">🚄 新大阪</span>
          <span class="city-tag">🏯 名古屋</span>
        </div>
      </div>
      <span class="cover-credit">Photo — Gang Hao / Unsplash</span>
    </div>

    <!-- 天數標籤列 -->
    <div class="day-tab-bar">
      <button
        v-for="d in dayTabs"
        :key="d.day"
        class="day-tab-btn"
        :class="{ active: activeDay === d.day }"
        @click="activeDay = d.day"
      >
        <span class="day-tab-num">D{{ d.day }}</span>
        <span class="day-tab-date">{{ d.date }}</span>
      </button>
      <button
        class="day-tab-btn extra-tab"
        :class="{ active: activeDay === 6 }"
        @click="activeDay = 6"
      >
        <span class="day-tab-num">✦</span>
        <span class="day-tab-date">EXTRA</span>
      </button>
    </div>

    <!-- 第一天 -->
    <div v-if="activeDay === 1">

    <!-- DAY 1 -->
    <div class="day-header">
      <div class="day-badge">
        <span class="badge-num">D1</span>
        <span class="badge-label">DAY 1</span>
      </div>
      <div class="day-info">
        <h2>抵達日本！前往名古屋</h2>
        <div class="day-weekday">2026 年 6 月 18 日（四）</div>
      </div>
    </div>

    <!-- 航班 -->
    <div class="card transport">
      <div class="card-header">
        <span class="card-icon">✈️</span>
        <span class="card-title">出發航班</span>
        <span class="card-time">07:05 起飛</span>
      </div>
      <table class="info-table">
        <thead><tr><th>出發</th><th>抵達</th><th>目的地</th></tr></thead>
        <tbody>
          <tr>
            <td><strong>07:05</strong></td>
            <td><strong>11:10</strong></td>
            <td>🛬 關西國際機場（KIX）</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 交通 -->
    <div class="card transport">
      <div class="card-header">
        <span class="card-icon">🚄</span>
        <span class="card-title">關西機場 → 名古屋　（JR Haruka + 新幹線）</span>
        <span class="card-time">11:10 出發</span>
      </div>
      <ul class="steps">
        <li><span class="step-num blue">1</span><span>在關西機場搭乘 <strong>JR 特急 Haruka</strong>，前往新大阪站</span></li>
        <li><span class="step-num blue">2</span><span>抵達<strong>新大阪站</strong> — 在站內買東西吃！月台便當 / 咖啡廳都很方便</span></li>
        <li><span class="step-num blue">3</span><span>轉乘<strong>東海道新幹線 Nozomi／Hikari</strong>，前往名古屋站</span></li>
        <li><span class="step-num blue">4</span><span>約 <strong>15:00</strong> 抵達名古屋站</span></li>
      </ul>
      <div class="alert">
        <span class="alert-icon">⏱</span>
        <span>總交通時間約 <strong>2 小時</strong>，是最省時的路線。</span>
      </div>
      <table class="info-table" style="margin-top:16px">
        <thead><tr><th>項目</th><th style="text-align:right">費用（日圓）</th></tr></thead>
        <tbody>
          <tr><td>JR Haruka（關西機場 → 新大阪）</td><td class="price">¥3,000 左右</td></tr>
          <tr><td>東海道新幹線（新大阪 → 名古屋）現場購票</td><td class="price">¥4,000～6,000</td></tr>
          <tr><td><strong>合計估算</strong></td><td class="price"><strong>¥7,000～9,000</strong></td></tr>
        </tbody>
      </table>
    </div>

    <!-- 車票 -->
    <div class="card ticket">
      <div class="card-header">
        <span class="card-icon">🎫</span>
        <span class="card-title">車票備忘</span>
      </div>
      <ul class="steps">
        <li><span class="step-num orange">A</span><span><strong>Haruka 票</strong>　可提前在台灣官網購買，或到關西機場服務台購票</span></li>
        <li><span class="step-num orange">B</span><span><strong>新幹線票</strong>　新大阪站現場購票（綠色窗口或自動售票機）</span></li>
      </ul>
    </div>

    <!-- 飯店 -->
    <div class="card hotel">
      <div class="card-header">
        <span class="card-icon">🏨</span>
        <span class="card-title">飯店 Check-in</span>
        <span class="card-time">15:00</span>
      </div>
      <div class="hotel-name">名古屋日航尚格酒店</div>
      <a
        href="https://www.google.com/maps/search/?api=1&query=Hotel+Nikko+Nagoya"
        target="_blank"
        rel="noopener noreferrer"
        class="address-box address-link"
      >
        <span class="addr-label">地址　<span class="map-hint">📍 點擊開啟 Google Maps</span></span>
        <span class="addr-text">〒450-0002　愛知縣名古屋市中村區名駅 5-20-13</span>
        <span class="addr-dist">🚶 名古屋站步行 11 分鐘　｜　🚗 車程 6 分鐘</span>
      </a>
      <div class="alert" style="margin-top:12px">
        <span class="alert-icon">💡</span>
        <span>行李重的話，直接搭計程車到飯店約 6 分鐘即可，省時又輕鬆。</span>
      </div>
    </div>

    <!-- 行程 -->
    <div class="card sightseeing">
      <div class="card-header">
        <span class="card-icon">🌆</span>
        <span class="card-title">下午行程　榮商圈 ＋ 綠洲21</span>
        <span class="card-time">16:00 出發</span>
      </div>
      <div class="spot-grid">
        <div class="spot-item clickable" @click="openSpot('sakae')">
          <div class="spot-icon">🛍</div>
          <div class="spot-name">榮商圈 <span class="spot-arrow">›</span></div>
          <div class="spot-desc">名古屋最熱鬧的購物區，百貨公司、藥妝、潮流品牌一應俱全，適合閒逛購物。</div>
        </div>
        <div class="spot-item clickable" @click="openSpot('oasis')">
          <div class="spot-icon">🌀</div>
          <div class="spot-name">綠洲21 <span class="spot-arrow">›</span></div>
          <div class="spot-desc">名古屋地標玻璃屋頂廣場，「水之宇宙船」設計，夜晚燈光尤其漂亮，完全免費。</div>
        </div>
        <div class="spot-item clickable" @click="openSpot('tvtower')">
          <div class="spot-icon">🗼</div>
          <div class="spot-name">名古屋電視塔 <span class="spot-arrow">›</span></div>
          <div class="spot-desc">日本第一座電視塔，位於榮公園中心，夜晚燈光與綠洲21相互輝映，構成城市夜景核心。</div>
        </div>
      </div>
      <div class="alert">
        <span class="alert-icon">🌙</span>
        <span>綠洲21 夜晚打燈後非常美，可以在榮逛完街再去拍照，電視塔也同步亮燈。</span>
      </div>
    </div>

    <!-- 晚餐 -->
    <div class="card food">
      <div class="card-header">
        <span class="card-icon">🥩</span>
        <span class="card-title">晚餐逛街　炸牛排</span>
      </div>
      <ul class="steps">
        <li><span class="step-num food-color">1</span><span><strong>炸牛排</strong>　榮商圈附近可找到炸牛排名店，香脆外皮搭鮮嫩牛肉，建議當日晚餐首選。</span></li>
        <li><span class="step-num food-color">2</span><span><strong>逛街</strong>　PARCO、LACHIC 等百貨及大型地下街，晚餐前後都適合閒逛採買。</span></li>
      </ul>
    </div>

    <!-- 備忘清單 -->
    <div class="card tip">
      <div class="card-header">
        <span class="card-icon">📋</span>
        <span class="card-title">第一天行前備忘</span>
      </div>
      <ul class="steps">
        <li><span class="step-num gray">✓</span><span>確認 Haruka 車票購買方式（現場 or 預購）</span></li>
        <li><span class="step-num gray">✓</span><span>新大阪站轉乘時間約 20～30 分，在月台或站內買食物</span></li>
        <li><span class="step-num gray">✓</span><span>準備日幣現金（新幹線現場購票）</span></li>
        <li><span class="step-num gray">✓</span><span>飯店行李寄放：如提早到可先寄行李再逛</span></li>
        <li><span class="step-num gray">✓</span><span>手機確認 Suica / ICOCA 或交通卡是否可用</span></li>
      </ul>
    </div>

    <div class="more-hint">✦ &nbsp; 更多行程持續更新中 &nbsp; ✦</div>

    <footer class="travel-footer">
      🇯🇵 Japan Trip 2026 &nbsp;｜&nbsp; Have a great journey!
    </footer>

    </div><!-- end day 1 -->

    <!-- 第二天 -->
    <div v-if="activeDay === 2">

    <div class="day-header">
      <div class="day-badge">
        <span class="badge-num">D2</span>
        <span class="badge-label">DAY 2</span>
      </div>
      <div class="day-info">
        <h2>名古屋市區深度遊</h2>
        <div class="day-weekday">2026 年 6 月 19 日（五）</div>
      </div>
    </div>

    <!-- 名古屋三井Outlet -->
    <div class="card sightseeing">
      <div class="card-header">
        <span class="card-icon">🛍️</span>
        <span class="card-title">名古屋三井 Outlet Park</span>
        <span class="card-time">9:00 出發 ｜ 10:00～15:00</span>
      </div>
      <div class="spot-grid">
        <div class="spot-item clickable" @click="openSpot('mitsui')">
          <div class="spot-icon">🛍️</div>
          <div class="spot-name">名古屋三井 Outlet <span class="spot-arrow">›</span></div>
          <div class="spot-desc">位於名古屋港旁，超過 200 間品牌進駐，時尚、運動、生活雜貨一次逛齊，是名古屋最大的 Outlet。</div>
        </div>
      </div>
      <ul class="steps" style="margin-top:12px">
        <li><span class="step-num teal">1</span><span>9:00 從飯店出發，搭地鐵<strong>名港線</strong>至<strong>名古屋港站</strong>（約 30 分鐘）</span></li>
        <li><span class="step-num teal">2</span><span>10:00 開門，建議先鎖定目標品牌，範圍較大請穿舒適鞋</span></li>
        <li><span class="step-num teal">3</span><span>15:00 離開，搭地鐵前往名古屋城</span></li>
      </ul>
      <div class="alert">
        <span class="alert-icon">💡</span>
        <span>Outlet 開門時間為 <strong>10:00</strong>，若提早抵達可在附近的<strong>名古屋港水族館</strong>外拍照等候。</span>
      </div>
    </div>

    <!-- 交通 Outlet→名古屋城 -->
    <div class="card transport">
      <div class="card-header">
        <span class="card-icon">🚇</span>
        <span class="card-title">名古屋三井 Outlet → 名古屋城</span>
        <span class="card-time">15:00 出發</span>
      </div>
      <ul class="steps">
        <li><span class="step-num blue">1</span><span>從<strong>名古屋港站</strong>搭地鐵名港線，在<strong>金山站</strong>轉乘名城線</span></li>
        <li><span class="step-num blue">2</span><span>名城線搭至<strong>市役所站</strong>下車，步行約 5 分鐘即達名古屋城</span></li>
        <li><span class="step-num blue">3</span><span>全程約 <strong>30 分鐘</strong>，約 15:30 抵達</span></li>
      </ul>
    </div>

    <!-- 名古屋城 -->
    <div class="card sightseeing">
      <div class="card-header">
        <span class="card-icon">🏯</span>
        <span class="card-title">名古屋城</span>
        <span class="card-time">15:30～17:00</span>
      </div>
      <div class="spot-grid">
        <div class="spot-item clickable" @click="openSpot('nagoyacastle')">
          <div class="spot-icon">🏯</div>
          <div class="spot-name">名古屋城 <span class="spot-arrow">›</span></div>
          <div class="spot-desc">德川家康建造的名城，金色鯱鉾聞名全日本，本丸御殿內部金碧輝煌，是江戶時代建築藝術的巔峰。</div>
        </div>
      </div>
      <ul class="steps" style="margin-top:12px">
        <li><span class="step-num orange">●</span><span><strong>本丸御殿</strong>　重建完成的豪華御殿，金碧裝飾令人驚嘆，為本次必看重點</span></li>
        <li><span class="step-num orange">●</span><span><strong>城牆與外苑</strong>　宏偉石垣，拍照絕佳角度</span></li>
        <li><span class="step-num orange">●</span><span><strong>金鯱</strong>　在地面近距離欣賞名古屋城的象徵</span></li>
      </ul>
      <div class="alert" style="margin-top:12px">
        <span class="alert-icon">⚠️</span>
        <span>天守閣目前整修中，<strong>無法入內</strong>。最後入場約 16:30，城內 17:00 關閉，請勿太晚抵達。</span>
      </div>
    </div>

    <!-- 交通 名古屋城→大須 -->
    <div class="card transport">
      <div class="card-header">
        <span class="card-icon">🚇</span>
        <span class="card-title">名古屋城 → 大須商店街</span>
        <span class="card-time">17:00 出發</span>
      </div>
      <ul class="steps">
        <li><span class="step-num blue">1</span><span>從<strong>市役所站</strong>搭地鐵名城線</span></li>
        <li><span class="step-num blue">2</span><span>在<strong>上前津站</strong>下車，步行約 5 分鐘進入商店街</span></li>
        <li><span class="step-num blue">3</span><span>車程約 <strong>15 分鐘</strong>，約 17:30 抵達</span></li>
      </ul>
    </div>

    <!-- 大須商店街 + 晚餐 -->
    <div class="card sightseeing">
      <div class="card-header">
        <span class="card-icon">🛍</span>
        <span class="card-title">大須商店街 ＋ 晚餐</span>
        <span class="card-time">17:30～20:30</span>
      </div>
      <div class="spot-grid">
        <div class="spot-item clickable" @click="openSpot('osu')">
          <div class="spot-icon">🏮</div>
          <div class="spot-name">大須商店街 <span class="spot-arrow">›</span></div>
          <div class="spot-desc">名古屋最有個性的商店街，傍晚最熱鬧，二手動漫、電器街、扭蛋、美食攤一應俱全。</div>
        </div>
      </div>
      <ul class="steps" style="margin-top:12px">
        <li><span class="step-num purple">●</span><span><strong>大須觀音</strong>　商店街起點，拍照打卡</span></li>
        <li><span class="step-num purple">●</span><span><strong>萬松寺</strong>　商店街中間的特色寺廟，有機器人表演</span></li>
        <li><span class="step-num purple">●</span><span><strong>電器街 ＋ 二手動漫店</strong>　ACG 愛好者必逛，品項豐富</span></li>
        <li><span class="step-num purple">●</span><span><strong>扭蛋店</strong>　種類齊全，預算抓好</span></li>
      </ul>
      <div class="card food" style="margin-top:12px; box-shadow:none; border:1px solid rgba(255,255,255,.08);">
        <div class="card-header" style="padding:0 0 8px">
          <span class="card-icon">🍗</span>
          <span class="card-title">大須美食街頭小吃</span>
        </div>
        <ul class="steps">
          <li><span class="step-num food-color">●</span><span><strong>唐揚雞</strong>　現炸鮮嫩，大須街邊人氣第一</span></li>
          <li><span class="step-num food-color">●</span><span><strong>章魚燒</strong>　道地大阪風，在名古屋也吃得到</span></li>
          <li><span class="step-num food-color">●</span><span><strong>鯛魚燒</strong>　甜點收尾，邊走邊吃</span></li>
        </ul>
      </div>
    </div>

    <!-- 時間軸總覽 -->
    <div class="card tip">
      <div class="card-header">
        <span class="card-icon">🗓</span>
        <span class="card-title">第二天時間軸總覽</span>
      </div>
      <table class="info-table">
        <thead><tr><th>時間</th><th>行程</th></tr></thead>
        <tbody>
          <tr><td><strong>9:00</strong></td><td>從飯店出發，搭地鐵名港線前往名古屋港</td></tr>
          <tr><td><strong>10:00～15:00</strong></td><td>🛍️ 名古屋三井 Outlet Park</td></tr>
          <tr><td><strong>15:00</strong></td><td>離開 Outlet，搭地鐵前往名古屋城</td></tr>
          <tr><td><strong>15:30～17:00</strong></td><td>🏯 名古屋城（本丸御殿、城牆、金鯱）</td></tr>
          <tr><td><strong>17:30～20:30</strong></td><td>🛍 大須商店街 ＋ 晚餐</td></tr>
        </tbody>
      </table>
    </div>

    <div class="more-hint">✦ &nbsp; 路線：三井 Outlet → 名古屋城 → 大須商店街 &nbsp; ✦</div>

    <footer class="travel-footer">
      🇯🇵 Japan Trip 2026 &nbsp;｜&nbsp; Have a great journey!
    </footer>

    </div><!-- end day 2 -->

    <!-- 第三天 -->
    <div v-if="activeDay === 3">

    <div class="day-header">
      <div class="day-badge">
        <span class="badge-num">D3</span>
        <span class="badge-label">DAY 3</span>
      </div>
      <div class="day-info">
        <h2>AEON ＋ 犬山城下町</h2>
        <div class="day-weekday">2026 年 6 月 20 日（六）</div>
      </div>
    </div>

    <!-- AEON Noritake Garden -->
    <div class="card sightseeing">
      <div class="card-header">
        <span class="card-icon">🏬</span>
        <span class="card-title">AEON MALL Nagoya Noritake Garden</span>
        <span class="card-time">10:00～12:45</span>
      </div>
      <div class="spot-grid">
        <div class="spot-item clickable" @click="openSpot('aeon')">
          <div class="spot-icon">🏬</div>
          <div class="spot-name">AEON Noritake Garden <span class="spot-arrow">›</span></div>
          <div class="spot-desc">緊鄰名古屋站的舒適商場，結合 MUJI、UNIQLO 與小庭園，適合早午餐和輕鬆暖身購物。</div>
        </div>
      </div>
      <ul class="steps" style="margin-top:12px">
        <li><span class="step-num teal">●</span><span><strong>早午餐</strong>　Starbucks（面對綠地，氣氛絕佳）或日式定食、甜點店</span></li>
        <li><span class="step-num teal">●</span><span><strong>輕鬆逛</strong>　MUJI、UNIQLO、日系生活雜貨、藥妝</span></li>
        <li><span class="step-num teal">●</span><span><strong>散步拍照</strong>　商場旁小庭園，氣氛悠閒，很適合拍照</span></li>
      </ul>
      <div class="alert">
        <span class="alert-icon">⏰</span>
        <span>這裡是「舒服型」非血拼型商場。<strong>12:45 前務必離開</strong>，否則犬山會變得很趕。</span>
      </div>
    </div>

    <!-- 交通 AEON→犬山 -->
    <div class="card transport">
      <div class="card-header">
        <span class="card-icon">🚆</span>
        <span class="card-title">AEON Noritake Garden → 犬山</span>
        <span class="card-time">12:45 出發</span>
      </div>
      <ul class="steps">
        <li><span class="step-num blue">1</span><span>步行至<strong>名古屋站</strong>，搭名鐵<strong>犬山線</strong></span></li>
        <li><span class="step-num blue">2</span><span>名鐵特急直達<strong>犬山站</strong>，約 <strong>25～30 分鐘</strong></span></li>
        <li><span class="step-num blue">3</span><span>含等車時間共約 <strong>1 小時</strong>，約 13:50 抵達犬山</span></li>
      </ul>
    </div>

    <!-- 犬山城 -->
    <div class="card sightseeing">
      <div class="card-header">
        <span class="card-icon">🏯</span>
        <span class="card-title">犬山城</span>
        <span class="card-time">13:50～15:00</span>
      </div>
      <div class="spot-grid">
        <div class="spot-item clickable" @click="openSpot('inuyama')">
          <div class="spot-icon">🏯</div>
          <div class="spot-name">犬山城 <span class="spot-arrow">›</span></div>
          <div class="spot-desc">日本現存最古老的木造天守之一，國寶級城堡，居高俯瞰木曾川，景色壯觀。</div>
        </div>
      </div>
      <ul class="steps" style="margin-top:12px">
        <li><span class="step-num orange">●</span><span><strong>上天守</strong>　木造樓梯，爬上頂層感受400年歷史</span></li>
        <li><span class="step-num orange">●</span><span><strong>木曾川景色</strong>　天守頂部 360 度俯瞰，晴天遠眺絕美</span></li>
        <li><span class="step-num orange">●</span><span><strong>拍照留念</strong>　城牆外拍全景，夏日綠意盎然</span></li>
      </ul>
      <div class="alert" style="margin-top:12px">
        <span class="alert-icon">⚠️</span>
        <span>天守樓梯極陡，請穿防滑鞋並注意安全。入場費 <strong>¥550</strong>，17:00 關閉（16:30 最後入場）。</span>
      </div>
    </div>

    <!-- 城下町 -->
    <div class="card sightseeing">
      <div class="card-header">
        <span class="card-icon">🍡</span>
        <span class="card-title">城下町散策 ＋ 美食</span>
        <span class="card-time">15:00～17:30</span>
      </div>
      <div class="spot-grid">
        <div class="spot-item clickable" @click="openSpot('jokamachi')">
          <div class="spot-icon">🏮</div>
          <div class="spot-name">犬山城下町 <span class="spot-arrow">›</span></div>
          <div class="spot-desc">城堡腳下的江戶古街，石板路兩側滿是老鋪，下午人潮最旺、店家全開，是整趟犬山的精華段。</div>
        </div>
      </div>
      <ul class="steps" style="margin-top:12px">
        <li><span class="step-num food-color">●</span><span><strong>飛驒牛握壽司</strong>　城下町必吃，現握現食，鮮甜入口即化</span></li>
        <li><span class="step-num food-color">●</span><span><strong>五平餅</strong>　串烤米餅抹醬，香氣十足的傳統小吃</span></li>
        <li><span class="step-num food-color">●</span><span><strong>抹茶甜點</strong>　宇治抹茶霜淇淋、抹茶大福，邊走邊吃</span></li>
        <li><span class="step-num purple">●</span><span><strong>老街散步</strong>　古民家改建小店、和風雜貨、陶器紀念品</span></li>
      </ul>
      <div class="alert">
        <span class="alert-icon">💡</span>
        <span>15:00 後才是城下町最熱鬧的時段，店家全開、人氣最旺，不要提早離開。</span>
      </div>
    </div>

    <!-- 收尾散步 -->
    <div class="card tip">
      <div class="card-header">
        <span class="card-icon">🌇</span>
        <span class="card-title">收尾散步</span>
        <span class="card-time">17:30～18:00</span>
      </div>
      <ul class="steps">
        <li><span class="step-num gray">●</span><span>沿<strong>木曾川河邊</strong>散步，看傍晚夕陽映在河面</span></li>
        <li><span class="step-num gray">●</span><span>找間城下町的<strong>咖啡廳</strong>休息，喝杯飲料補充體力</span></li>
        <li><span class="step-num gray">●</span><span>夕陽角度絕佳，拍幾張<strong>夜色城堡</strong>再離開</span></li>
      </ul>
    </div>

    <!-- 交通 犬山→名古屋 -->
    <div class="card transport">
      <div class="card-header">
        <span class="card-icon">🚆</span>
        <span class="card-title">犬山 → 名古屋</span>
        <span class="card-time">18:00 出發</span>
      </div>
      <ul class="steps">
        <li><span class="step-num blue">1</span><span>從<strong>犬山站</strong>搭名鐵犬山線回名古屋</span></li>
        <li><span class="step-num blue">2</span><span>車程約 <strong>30～40 分鐘</strong>，約 19:00 抵達名古屋站</span></li>
        <li><span class="step-num blue">3</span><span>回飯店休息，或前往<strong>榮商圈</strong>吃晚餐</span></li>
      </ul>
    </div>

    <!-- 時間軸總覽 -->
    <div class="card tip">
      <div class="card-header">
        <span class="card-icon">🗓</span>
        <span class="card-title">第三天時間軸總覽</span>
      </div>
      <table class="info-table">
        <thead><tr><th>時間</th><th>行程</th></tr></thead>
        <tbody>
          <tr><td><strong>10:00～12:45</strong></td><td>🏬 AEON Noritake Garden（早午餐 ＋ 輕鬆逛）</td></tr>
          <tr><td><strong>12:45</strong></td><td>離開 AEON，前往名古屋站搭名鐵</td></tr>
          <tr><td><strong>13:50～15:00</strong></td><td>🏯 犬山城（天守 ＋ 木曾川全景）</td></tr>
          <tr><td><strong>15:00～17:30</strong></td><td>🍡 城下町（飛驒牛 ＋ 五平餅 ＋ 抹茶 ＋ 老街）</td></tr>
          <tr><td><strong>17:30～18:00</strong></td><td>🌇 木曾川河邊收尾散步</td></tr>
          <tr><td><strong>18:00</strong></td><td>搭名鐵返回名古屋站</td></tr>
          <tr><td><strong>19:00</strong></td><td>回飯店 or 榮商圈晚餐</td></tr>
        </tbody>
      </table>
    </div>

    <div class="more-hint">✦ &nbsp; 路線：AEON Noritake → 犬山城 → 城下町 → 返回名古屋 &nbsp; ✦</div>

    <footer class="travel-footer">
      🇯🇵 Japan Trip 2026 &nbsp;｜&nbsp; Have a great journey!
    </footer>

    </div><!-- end day 3 -->

    <!-- 第四天 -->
    <div v-if="activeDay === 4">

    <div class="day-header">
      <div class="day-badge">
        <span class="badge-num">D4</span>
        <span class="badge-label">DAY 4</span>
      </div>
      <div class="day-info">
        <h2>名古屋 → 大阪！</h2>
        <div class="day-weekday">2026 年 6 月 21 日（日）</div>
      </div>
    </div>

    <!-- 早餐 + 退房 -->
    <div class="card hotel">
      <div class="card-header">
        <span class="card-icon">🏨</span>
        <span class="card-title">飯店早餐 ＋ 整理行李 ＆ 退房</span>
        <span class="card-time">早餐後 ／ 11:00 退房</span>
      </div>
      <div class="hotel-name">名古屋日航尚格酒店</div>
      <ul class="steps" style="margin-top:12px">
        <li><span class="step-num teal">●</span><span>早上在飯店享用<strong>早餐</strong>，悠閒開始這天</span></li>
        <li><span class="step-num teal">●</span><span>餐後回房<strong>整理行李</strong>，確認不遺漏任何物品</span></li>
        <li><span class="step-num teal">●</span><span><strong>11:00</strong> 辦理退房，步行前往名古屋站</span></li>
      </ul>
      <div class="alert" style="margin-top:10px">
        <span class="alert-icon">💡</span>
        <span>退房後步行或搭計程車（約 6 分鐘）前往名古屋站，準備搭新幹線出發。</span>
      </div>
    </div>

    <!-- 前往大阪 -->
    <div class="card transport">
      <div class="card-header">
        <span class="card-icon">🚄</span>
        <span class="card-title">名古屋 → 新大阪　（東海道新幹線 Nozomi）</span>
        <span class="card-time">11:30 出發</span>
      </div>
      <ul class="steps">
        <li><span class="step-num blue">1</span><span>從名古屋站搭乘 <strong>東海道新幹線 Nozomi</strong> 前往新大阪</span></li>
        <li><span class="step-num blue">2</span><span>車程約 <strong>50 分鐘</strong>，約 <strong>12:50</strong> 抵達新大阪</span></li>
        <li><span class="step-num blue">3</span><span>在新大阪轉乘地下鐵御堂筋線，前往難波（約 20 分鐘）</span></li>
      </ul>
      <table class="info-table" style="margin-top:14px">
        <thead><tr><th>路線</th><th style="text-align:right">費用估算</th></tr></thead>
        <tbody>
          <tr><td>東海道新幹線 Nozomi（名古屋 → 新大阪）</td><td class="price">¥4,000～6,000</td></tr>
          <tr><td>地下鐵御堂筋線（新大阪 → 難波）</td><td class="price">¥280 左右</td></tr>
        </tbody>
      </table>
    </div>

    <!-- 抵達難波飯店 -->
    <div class="card hotel">
      <div class="card-header">
        <span class="card-icon">🏨</span>
        <span class="card-title">抵達難波 － 飯店寄放行李</span>
        <span class="card-time">13:00</span>
      </div>
      <div class="hotel-name">難波京阪格蘭德飯店</div>
      <div class="hotel-name-sub">ホテル京阪 なんば グランデ</div>
      <a
        href="https://www.google.com/maps/search/?api=1&query=ホテル京阪+なんば+グランデ"
        target="_blank"
        rel="noopener noreferrer"
        class="address-box address-link"
        style="margin-bottom:8px"
      >
        <span class="addr-label">地址　<span class="map-hint">📍 點擊開啟 Google Maps</span></span>
        <span class="addr-text">〒556-0011　大阪府大阪市浪速區難波中 2-3-33</span>
        <span class="addr-dist">🚶 南海電鐵難波站步行 6 分鐘</span>
      </a>
      <div class="alert" style="margin-top:8px">
        <span class="alert-icon">💡</span>
        <span>Check-in 時間未到可先寄放行李，輕裝前往梅田逛街。</span>
      </div>
    </div>

    <!-- 前往梅田 -->
    <div class="card transport">
      <div class="card-header">
        <span class="card-icon">🚇</span>
        <span class="card-title">難波 → 梅田　（御堂筋線）</span>
        <span class="card-time">14:00 出發</span>
      </div>
      <ul class="steps">
        <li><span class="step-num blue">1</span><span>搭乘 <strong>地下鐵御堂筋線</strong>，難波站 → 梅田站</span></li>
        <li><span class="step-num blue">2</span><span>車程約 <strong>10 分鐘</strong>，約 <strong>14:30</strong> 抵達梅田</span></li>
      </ul>
    </div>

    <!-- 梅田自由活動 -->
    <div class="card sightseeing">
      <div class="card-header">
        <span class="card-icon">🛍</span>
        <span class="card-title">梅田自由活動</span>
        <span class="card-time">14:30～17:30</span>
      </div>
      <div class="spot-grid">
        <div class="spot-item">
          <div class="spot-icon">🏬</div>
          <div class="spot-name">Grand Front Osaka</div>
          <div class="spot-desc">UNIQLO、無印良品、設計雜貨，購物與咖啡廳一應俱全。</div>
        </div>
        <div class="spot-item">
          <div class="spot-icon">👗</div>
          <div class="spot-name">LUCUA Osaka</div>
          <div class="spot-desc">年輕品牌眾多，潮流服飾與餐廳選擇豐富。</div>
        </div>
        <div class="spot-item">
          <div class="spot-icon">🎁</div>
          <div class="spot-name">阪急百貨</div>
          <div class="spot-desc">梅田本店伴手禮非常齊全，帶禮物回家的不二選擇。</div>
        </div>
        <div class="spot-item">
          <div class="spot-icon">🌆</div>
          <div class="spot-name">梅田藍天大廈（可選）</div>
          <div class="spot-desc">Umeda Sky Building，天氣好可俯瞰大阪市景，建議預留 40～60 分鐘。</div>
        </div>
      </div>
    </div>

    <!-- 晚餐 -->
    <div class="card food">
      <div class="card-header">
        <span class="card-icon">🍽</span>
        <span class="card-title">晚餐</span>
        <span class="card-time">17:30～19:00</span>
      </div>
      <ul class="steps">
        <li><span class="step-num food-color">A</span><span><strong>燒肉</strong>　Yakiniku M Hozenji Yokocho　法善寺橫丁，道頓堀周邊名店。</span></li>
        <li><span class="step-num food-color">B</span><span><strong>壽喜燒</strong>　Harijyu Dotonbori　道頓堀老牌壽喜燒餐廳，肉質鮮嫩。</span></li>
        <li><span class="step-num food-color">C</span><span><strong>大阪燒</strong>　Mizuno　道頓堀大阪燒代表名店，排隊也值得。</span></li>
      </ul>
    </div>

    <!-- 心齋橋交通 -->
    <div class="card transport">
      <div class="card-header">
        <span class="card-icon">🚇</span>
        <span class="card-title">梅田 → 心齋橋　（御堂筋線）</span>
        <span class="card-time">19:00 出發</span>
      </div>
      <ul class="steps">
        <li><span class="step-num blue">1</span><span>搭乘御堂筋線，梅田 → 心齋橋，約 <strong>8 分鐘</strong></span></li>
      </ul>
    </div>

    <!-- 心齋橋、道頓堀 -->
    <div class="card sightseeing">
      <div class="card-header">
        <span class="card-icon">🦀</span>
        <span class="card-title">心齋橋 ＆ 道頓堀夜遊</span>
        <span class="card-time">19:15～22:00</span>
      </div>
      <div class="spot-grid">
        <div class="spot-item">
          <div class="spot-icon">🛍</div>
          <div class="spot-name">心齋橋筋商店街</div>
          <div class="spot-desc">大阪最長的拱廊商店街，藥妝、服飾、美食琳瑯滿目。</div>
        </div>
        <div class="spot-item">
          <div class="spot-icon">🌉</div>
          <div class="spot-name">道頓堀 ＆ 戎橋</div>
          <div class="spot-desc">道頓堀運河夜景，必拍固力果跑跑人，大阪最具代表的地標。</div>
        </div>
        <div class="spot-item">
          <div class="spot-icon">💊</div>
          <div class="spot-name">藥妝採買</div>
          <div class="spot-desc">松本清、科摩斯 COSMOS 等藥妝店林立，伴手禮一次買齊。</div>
        </div>
        <div class="spot-item">
          <div class="spot-icon">🛒</div>
          <div class="spot-name">唐吉軻德</div>
          <div class="spot-desc">Don Quijote 道頓堀店，零食、生活雜貨、電器一應俱全。</div>
        </div>
      </div>
      <div class="alert">
        <span class="alert-icon">🌙</span>
        <span>22:00 後從心齋橋步行回難波飯店約 <strong>15～20 分鐘</strong>，或搭地鐵 1 站即達。</span>
      </div>
    </div>

    <!-- 備忘清單 -->
    <div class="card tip">
      <div class="card-header">
        <span class="card-icon">📋</span>
        <span class="card-title">第四天行前備忘</span>
      </div>
      <ul class="steps">
        <li><span class="step-num gray">✓</span><span>提前購買新幹線 Nozomi 車票（綠色窗口或自動售票機）</span></li>
        <li><span class="step-num gray">✓</span><span>退房前確認行李不遺漏</span></li>
        <li><span class="step-num gray">✓</span><span>難波飯店先寄放行李，下午輕裝逛梅田</span></li>
        <li><span class="step-num gray">✓</span><span>晚餐熱門餐廳（如 Mizuno）建議提前預約或早點排隊</span></li>
        <li><span class="step-num gray">✓</span><span>藥妝購物確認品項清單，避免遺漏</span></li>
      </ul>
    </div>

    <footer class="travel-footer">
      🇯🇵 Japan Trip 2026 &nbsp;｜&nbsp; Have a great journey!
    </footer>

    </div><!-- end day 4 -->

    <!-- 第五天 -->
    <div v-if="activeDay === 5">

    <div class="day-header">
      <div class="day-badge">
        <span class="badge-num">D5</span>
        <span class="badge-label">DAY 5</span>
      </div>
      <div class="day-info">
        <h2>回程！難波 → 關西機場</h2>
        <div class="day-weekday">2026 年 6 月 22 日（一）</div>
      </div>
    </div>

    <!-- 飯店退房 -->
    <div class="card hotel">
      <div class="card-header">
        <span class="card-icon">🏨</span>
        <span class="card-title">飯店 Check-out</span>
        <span class="card-time">09:00</span>
      </div>
      <div class="hotel-name">難波京阪格蘭德飯店</div>
      <div class="hotel-name-sub">ホテル京阪 なんば グランデ</div>
      <a
        href="https://www.google.com/maps/search/?api=1&query=ホテル京阪+なんば+グランデ"
        target="_blank"
        rel="noopener noreferrer"
        class="address-box address-link"
        style="margin-bottom:8px"
      >
        <span class="addr-label">地址　<span class="map-hint">📍 點擊開啟 Google Maps</span></span>
        <span class="addr-text">〒556-0011　大阪府大阪市浪速區難波中 2-3-33</span>
        <span class="addr-dist">🚶 南海電鐵難波站步行 6 分鐘</span>
      </a>
      <div class="alert" style="margin-top:8px">
        <span class="alert-icon">💡</span>
        <span>預計 9:00 前退房，退房後步行約 <strong>6 分鐘</strong>到南海電鐵難波站。</span>
      </div>
    </div>

    <!-- 南海電鐵 -->
    <div class="card transport">
      <div class="card-header">
        <span class="card-icon">🚃</span>
        <span class="card-title">難波 → 關西機場　（南海電鐵 最推薦）</span>
        <span class="card-time">09:00 後出發</span>
      </div>
      <ul class="steps">
        <li><span class="step-num blue">1</span><span>從飯店步行約 <strong>6 分鐘</strong>到 <strong>南海電鐵 難波站</strong>（Nankai Namba Station）</span></li>
        <li><span class="step-num blue">2</span><span>搭乘 <strong>Nankai Limited Express Rapi:t（特急 ラピート）</strong></span></li>
        <li><span class="step-num blue">3</span><span>約 <strong>35～40 分鐘</strong>直達 <strong>關西空港站</strong>（Kansai Airport Station）</span></li>
        <li><span class="step-num blue">4</span><span>出站後前往 <strong>第一航廈</strong>，辦理報到手續</span></li>
      </ul>
      <div class="alert">
        <span class="alert-icon">⭐</span>
        <span>全車指定席，行李多最舒適。<strong>記得提前訂票</strong>，避免無座。</span>
      </div>
    </div>

    <!-- 回程航班 -->
    <div class="card transport">
      <div class="card-header">
        <span class="card-icon">✈️</span>
        <span class="card-title">回程航班　BR181</span>
        <span class="card-time">12:10 起飛</span>
      </div>
      <table class="info-table">
        <thead><tr><th>航班</th><th>出發</th><th>抵達</th><th>目的地</th></tr></thead>
        <tbody>
          <tr>
            <td><strong>BR181</strong></td>
            <td><strong>12:10</strong></td>
            <td><strong>14:30</strong></td>
            <td>🛬 高雄小港機場（KHH）</td>
          </tr>
        </tbody>
      </table>
      <div class="alert" style="margin-top:14px">
        <span class="alert-icon">🏢</span>
        <span>關西機場 <strong>第一航廈</strong></span>
      </div>
      <div class="alert" style="margin-top:8px">
        <span class="alert-icon">🧳</span>
        <span>行李限額：托運行李 <strong>兩件各 23 公斤</strong></span>
      </div>
    </div>

    <!-- 備忘清單 -->
    <div class="card tip">
      <div class="card-header">
        <span class="card-icon">📋</span>
        <span class="card-title">第五天行前備忘</span>
      </div>
      <ul class="steps">
        <li><span class="step-num gray">✓</span><span>提前訂好南海電鐵 Rapi:t 車票（官網或 APP 皆可）</span></li>
        <li><span class="step-num gray">✓</span><span>退房前行李清點，不要遺漏物品</span></li>
        <li><span class="step-num gray">✓</span><span>航班 12:10，建議 <strong>10:00 前</strong>抵達關西機場第一航廈</span></li>
        <li><span class="step-num gray">✓</span><span>確認護照、機票電子票、剩餘日幣是否需要兌換</span></li>
        <li><span class="step-num gray">✓</span><span>行李超重提前確認，避免機場臨時加購</span></li>
      </ul>
    </div>

    <footer class="travel-footer">
      🇯🇵 Japan Trip 2026 &nbsp;｜&nbsp; Have a great journey home!
    </footer>

    </div><!-- end day 5 -->

    <!-- EXTRA -->
    <div v-if="activeDay === 6">

    <div class="day-header">
      <div class="day-badge" style="background: linear-gradient(135deg,#7b5ea7,#a07cc0)">
        <span class="badge-num">✦</span>
        <span class="badge-label">EXTRA</span>
      </div>
      <div class="day-info">
        <h2>備用景點 ＆ 加碼行程</h2>
        <div class="day-weekday">有空就去，沒空就跳過</div>
      </div>
    </div>

    <!-- ASUNAL 金山 -->
    <div class="card tip">
      <div class="card-header">
        <span class="card-icon">✨</span>
        <span class="card-title">有空加碼　ASUNAL 金山</span>
        <span class="card-time">大須逛完後 20:30～21:30</span>
      </div>
      <div class="spot-grid">
        <div class="spot-item clickable" @click="openSpot('asunal')">
          <div class="spot-icon">🏬</div>
          <div class="spot-name">ASUNAL 金山 <span class="spot-arrow">›</span></div>
          <div class="spot-desc">金山站旁半開放式商場，晚上氣氛輕鬆愜意，偏在地人會去的地方，適合當天收尾散步。</div>
        </div>
      </div>
      <ul class="steps" style="margin-top:12px">
        <li><span class="step-num gray">●</span><span>從大須搭地鐵名城線到<strong>金山站</strong>，約 <strong>5 分鐘</strong></span></li>
        <li><span class="step-num gray">●</span><span>商場大部分店鋪營業至 <strong>21:00～21:30</strong>，餐廳多到 22:00</span></li>
        <li><span class="step-num gray">●</span><span>如果大須逛太久體力不足，可直接跳過；若還有精神，金山夜晚氛圍很適合收尾</span></li>
      </ul>
      <div class="alert">
        <span class="alert-icon">💡</span>
        <span>這是<strong>選擇性行程</strong>，大須逛得盡興的話不一定要去，金山比較偏在地人氛圍，不像榮商圈觀光感那麼重。</span>
      </div>
    </div>

    <footer class="travel-footer">
      🇯🇵 Japan Trip 2026 &nbsp;｜&nbsp; Have a great journey!
    </footer>

    </div><!-- end extra -->

    </div><!-- end nagoya -->

    <!-- 香港 -->
    <div v-if="activeTab === 'hongkong'">
      <div class="cover">
        <img class="cover-photo" src="https://images.unsplash.com/photo-1696611085884-231d2fc7733d?q=80&w=1600&auto=format&fit=crop" alt="Hong Kong's Victoria Harbour skyline" />
        <div class="cover-scrim" />
        <div class="cover-content">
          <div class="cover-sub">Travel Guide</div>
          <h1 class="cover-title">香港旅遊手冊</h1>
          <div class="cover-dates">敬請期待</div>
          <div class="cover-cities">
            <span class="city-tag">✈ 香港國際機場</span>
            <span class="city-tag">🌆 維多利亞港</span>
            <span class="city-tag">🏙 九龍</span>
          </div>
        </div>
        <span class="cover-credit">Photo — Ste / Unsplash</span>
      </div>
      <div class="coming-soon">
        <div class="cs-icon">🏮</div>
        <div class="cs-title">香港行程規劃中</div>
        <div class="cs-desc">內容即將更新，敬請期待。</div>
      </div>
    </div>

    <!-- 東京 -->
    <div v-if="activeTab === 'tokyo'">

      <!-- 封面 -->
      <div class="cover">
        <img class="cover-photo" src="https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=1600&auto=format&fit=crop" alt="Tokyo Tower lit up at dusk above the city skyline" />
        <div class="cover-scrim" />
        <div class="cover-content">
          <div class="cover-sub">Travel Guide 2026　·　仔仔 &amp; 許寶</div>
          <h1 class="cover-title">東京五天四夜自由行</h1>
          <div class="cover-dates">2026 年 10 月 22 日（四）～ 10 月 26 日（一）</div>
          <div class="cover-cities">
            <span class="city-tag">✈ 成田機場</span>
            <span class="city-tag">🏮 鶯谷・根岸</span>
            <span class="city-tag">🗻 河口湖</span>
            <span class="city-tag">🎆 台場</span>
          </div>
        </div>
        <span class="cover-credit">Photo — Louie Martinez / Unsplash</span>
      </div>

      <!-- 天數標籤列 -->
      <div class="day-tab-bar">
        <button
          v-for="d in tokyoDayTabs"
          :key="d.day"
          class="day-tab-btn"
          :class="{ active: tokyoDay === d.day }"
          @click="tokyoDay = d.day"
        >
          <span class="day-tab-num">D{{ d.day }}</span>
          <span class="day-tab-date">{{ d.date }}</span>
        </button>
        <button
          class="day-tab-btn"
          :class="{ active: tokyoDay === 7 }"
          @click="tokyoDay = 7"
        >
          <span class="day-tab-num">🍜</span>
          <span class="day-tab-date">美食</span>
        </button>
        <button
          class="day-tab-btn extra-tab"
          :class="{ active: tokyoDay === 6 }"
          @click="tokyoDay = 6"
        >
          <span class="day-tab-num">✦</span>
          <span class="day-tab-date">清單</span>
        </button>
      </div>

      <!-- 第一天 -->
      <div v-if="tokyoDay === 1">

      <div class="day-header">
        <div class="day-badge">
          <span class="badge-num">D1</span>
          <span class="badge-label">DAY 1</span>
        </div>
        <div class="day-info">
          <h2>抵達東京後的輕鬆第一晚 ♨️</h2>
          <div class="day-weekday">2026 年 10 月 22 日（四）　·　15:20 成田落地　→　約 22:00 回飯店</div>
        </div>
      </div>

      <!-- 抵達 -->
      <div class="card transport">
        <div class="card-header">
          <span class="card-icon">✈️</span>
          <span class="card-title">去程航班　樂桃航空 MM626</span>
          <span class="card-time">10:50 起飛 → 15:20 落地</span>
        </div>
        <table class="info-table">
          <thead><tr><th>項目</th><th>內容</th></tr></thead>
          <tbody>
            <tr><td>日期</td><td><strong>2026/10/22（四）</strong></td></tr>
            <tr><td>航班</td><td><strong>樂桃航空 MM626</strong></td></tr>
            <tr><td>出發</td><td>🛫 <strong>10:50</strong>　桃園機場 <strong>第一航廈</strong>（台灣時間）</td></tr>
            <tr><td>抵達</td><td>🛬 <strong>15:20</strong>　成田機場 <strong>第一航廈</strong>（日本時間）</td></tr>
            <tr><td>飛行時間</td><td>約 3 小時 30 分</td></tr>
            <tr><td>行李</td><td>🧳 托運行李 <strong>1 件 20 公斤</strong></td></tr>
          </tbody>
        </table>
        <div class="alert" style="margin-top:14px">
          <span class="alert-icon">🕐</span>
          <span>日本比台灣<strong>快 1 小時</strong>，落地後記得把手機時間確認一下。</span>
        </div>
        <ul class="steps" style="margin-top:12px">
          <li><span class="step-num blue">1</span><span><strong>入境審查</strong>　建議先在飛機上或手機填好 Visit Japan Web，過關較快</span></li>
          <li><span class="step-num blue">2</span><span><strong>領行李</strong></span></li>
          <li><span class="step-num blue">3</span><span><strong>前往東京市區</strong>　在機場車站買票／取網卡</span></li>
          <li><span class="step-num blue">4</span><span><strong>前往根岸住宿</strong></span></li>
        </ul>
        <div class="alert">
          <span class="alert-icon">⏱</span>
          <span>入境加領行李一般抓 <strong>40～60 分鐘</strong>，也就是大約 <strong>16:20～16:30</strong> 才會走到機場車站。</span>
        </div>
      </div>

      <!-- 交通 -->
      <div class="card transport">
        <div class="card-header">
          <span class="card-icon">🚃</span>
          <span class="card-title">成田機場 → 鶯谷／根岸</span>
          <span class="card-time">約 16:30 出發</span>
        </div>
        <ul class="steps">
          <li><span class="step-num blue">A</span><span><strong>京成 Skyliner</strong>（最快）　成田機場 → <strong>京成上野站</strong>，約 <strong>41 分鐘</strong>，全車指定席</span></li>
          <li><span class="step-num blue">↓</span><span>京成上野站步行約 <strong>5 分鐘</strong>轉到 <strong>JR 上野站</strong></span></li>
          <li><span class="step-num blue">↓</span><span>JR <strong>山手線／京濱東北線</strong>，上野 → <strong>鶯谷</strong>只有 <strong>1 站</strong>，約 2 分鐘</span></li>
          <li><span class="step-num blue">B</span><span><strong>京成本線 特急</strong>（較省錢、較慢）　直達京成上野約 <strong>75 分鐘</strong>，不用劃位</span></li>
        </ul>
        <table class="info-table" style="margin-top:16px">
          <thead><tr><th>路線</th><th>時間</th><th style="text-align:right">費用（日圓）</th></tr></thead>
          <tbody>
            <tr><td>京成 Skyliner（成田 → 京成上野）</td><td>約 41 分</td><td class="price">約 ¥2,500～2,600</td></tr>
            <tr><td>京成本線 特急（成田 → 京成上野）</td><td>約 75 分</td><td class="price">約 ¥1,100</td></tr>
            <tr><td>JR 上野 → 鶯谷</td><td>約 2 分</td><td class="price">約 ¥150</td></tr>
          </tbody>
        </table>
        <div class="alert" style="margin-top:14px">
          <span class="alert-icon">⚠️</span>
          <span>票價與班距<strong>以京成電鐵官網為準</strong>，出發前再確認一次；Skyliner 可先在網路上訂位。</span>
        </div>
        <div class="alert" style="margin-top:8px">
          <span class="alert-icon">🏨</span>
          <span>照這個節奏走，預計 <strong>18:00～18:30</strong> 抵達住宿。</span>
        </div>
      </div>

      <!-- 飯店 -->
      <div class="card hotel">
        <div class="card-header">
          <span class="card-icon">🏨</span>
          <span class="card-title">Check-in ＋ 稍微休息</span>
          <span class="card-time">18:00～18:30</span>
        </div>
        <div class="hotel-name">根岸 小島ビル</div>
        <div class="hotel-name-sub">住宿名稱待補</div>
        <a
          href="https://www.google.com/maps/search/?api=1&query=%E6%9D%B1%E4%BA%AC%E9%83%BD%E5%8F%B0%E6%9D%B1%E5%8C%BA%E6%A0%B9%E5%B2%B82-1-9"
          target="_blank"
          rel="noopener noreferrer"
          class="address-box address-link"
        >
          <span class="addr-label">地址　<span class="map-hint">📍 點擊開啟 Google Maps</span></span>
          <span class="addr-text">〒110-0003　東京都台東区根岸 2-1-9　小島ビル</span>
          <span class="addr-dist">🚃 JR 山手線・京濱東北線「鶯谷站」　｜　上野站 1 站</span>
        </a>
        <div class="alert" style="margin-top:12px">
          <span class="alert-icon">💡</span>
          <span>回飯店放行李、整理一下就好。<strong>第一天不趕行程</strong>，接下來都是走路可到的範圍。</span>
        </div>
      </div>

      <!-- 散步 -->
      <div class="card sightseeing">
        <div class="card-header">
          <span class="card-icon">🌃</span>
          <span class="card-title">鶯谷／根岸附近散步</span>
          <span class="card-time">18:30～19:00</span>
        </div>
        <div class="spot-grid">
          <div class="spot-item clickable" @click="openSpot('uguisudani')">
            <div class="spot-icon">🏮</div>
            <div class="spot-name">鶯谷・根岸街區 <span class="spot-arrow">›</span></div>
            <div class="spot-desc">不是大型觀光景點，而是比較有生活感的東京街區，適合第一晚慢慢走、隨意看。</div>
          </div>
        </div>
        <ul class="steps" style="margin-top:12px">
          <li><span class="step-num teal">🏠</span><span>日本住宅街</span></li>
          <li><span class="step-num teal">🏮</span><span>居酒屋招牌</span></li>
          <li><span class="step-num teal">🚃</span><span>鶯谷車站周邊</span></li>
          <li><span class="step-num teal">🏪</span><span>便利商店</span></li>
          <li><span class="step-num teal">🍜</span><span>小餐廳</span></li>
          <li><span class="step-num teal">🌃</span><span>晚上的東京街道</span></li>
        </ul>
        <div class="alert">
          <span class="alert-icon">💡</span>
          <span><strong>不用設定一定要去哪一家店</strong>，看到有興趣的小店就進去看看。</span>
        </div>
      </div>

      <!-- 晚餐 -->
      <div class="card food">
        <div class="card-header">
          <span class="card-icon">🍢</span>
          <span class="card-title">第一晚的日本晚餐　居酒屋</span>
          <span class="card-time">19:00～20:30</span>
        </div>
        <div class="spot-grid">
          <div class="spot-item clickable" @click="openSpot('izakaya')">
            <div class="spot-icon">🍶</div>
            <div class="spot-name">鶯谷・根岸的居酒屋 <span class="spot-arrow">›</span></div>
            <div class="spot-desc">第一選擇。可以坐下來慢慢吃、慢慢喝的那種店，不用趕。</div>
          </div>
        </div>
        <ul class="steps" style="margin-top:12px">
          <li><span class="step-num food-color">●</span><span><strong>很多小菜可以分食</strong></span></li>
          <li><span class="step-num food-color">●</span><span>串燒 · 炸物 · 烤魚 · 玉子燒</span></li>
          <li><span class="step-num food-color">●</span><span>日本酒 ／ 啤酒 ／ Highball</span></li>
        </ul>
        <table class="info-table" style="margin-top:16px">
          <thead><tr><th>候選店家</th><th>位置</th><th>營業到</th></tr></thead>
          <tbody>
            <tr><td><strong>居酒屋 響 HIBIKI</strong></td><td>鶯谷站步行約 1 分鐘</td><td>23:00</td></tr>
            <tr><td><strong>居酒屋 關所</strong></td><td>鶯谷站旁</td><td>23:30（週一～週六）</td></tr>
          </tbody>
        </table>
        <div class="alert" style="margin-top:14px">
          <span class="alert-icon">🌙</span>
          <span>這一帶不少店營業到晚上甚至深夜，<strong>不用擔心第一天太晚才到</strong>。營業時間出發前再確認一次。</span>
        </div>
        <div class="alert" style="margin-top:8px">
          <span class="alert-icon">🥩</span>
          <span>想吃得更有名、認真吃一餐的話，也可以考慮<strong>根岸一帶的燒肉</strong>。</span>
        </div>
      </div>

      <!-- 飯後小逛 -->
      <div class="card sightseeing">
        <div class="card-header">
          <span class="card-icon">🛍️</span>
          <span class="card-title">吃完飯後小逛　二選一</span>
          <span class="card-time">20:30～21:00</span>
        </div>
        <div class="spot-grid">
          <div class="spot-item clickable" @click="openSpot('ameyoko')">
            <div class="spot-icon">🛍️</div>
            <div class="spot-name">A 方案　阿美橫町 <span class="spot-arrow">›</span></div>
            <div class="spot-desc">有體力就去。鶯谷 → 上野只有 1 站，熱鬧、街頭、小吃、居酒屋，很有東京生活感。</div>
          </div>
          <div class="spot-item">
            <div class="spot-icon">🏪</div>
            <div class="spot-name">B 方案　留在鶯谷</div>
            <div class="spot-desc">累了就直接在鶯谷附近走一下，買個便利商店甜點／飲料就回飯店。</div>
          </div>
        </div>
        <div class="alert" style="margin-top:12px">
          <span class="alert-icon">⚠️</span>
          <span>阿美橫町<strong>不要當成「晚上逛市場」</strong>——很多傳統商店晚上會陸續關門。第一天到得比較晚的話，重點是<strong>看街道 ＋ 感受氣氛 ＋ 吃東西</strong>，而不是認真購物。</span>
        </div>
        <div class="alert" style="margin-top:8px">
          <span class="alert-icon">💚</span>
          <span>如果吃完飯覺得「今天其實已經夠了」，就選 B。<strong>完全不用為了「有去一個景點」而硬搭車。</strong></span>
        </div>
      </div>

      <!-- 湯屋 -->
      <div class="card ticket">
        <div class="card-header">
          <span class="card-icon">♨️</span>
          <span class="card-title">逛完去泡湯　ひだまりの泉 萩の湯</span>
          <span class="card-time">21:00～22:00</span>
        </div>
        <div class="spot-grid">
          <div class="spot-item clickable" @click="openSpot('haginoyu')">
            <div class="spot-icon">♨️</div>
            <div class="spot-name">萩の湯 <span class="spot-arrow">›</span></div>
            <div class="spot-desc">東京都內最大級的公眾浴場，有露天風呂。鶯谷站北口步行 3 分鐘，就在住宿附近。</div>
          </div>
        </div>
        <a
          href="https://www.google.com/maps/search/?api=1&query=%E3%81%B2%E3%81%A0%E3%81%BE%E3%82%8A%E3%81%AE%E6%B3%89%20%E8%90%A9%E3%81%AE%E6%B9%AF%20%E6%A0%B9%E5%B2%B8"
          target="_blank"
          rel="noopener noreferrer"
          class="address-box address-link"
          style="margin-top:12px"
        >
          <span class="addr-label">地址　<span class="map-hint">📍 點擊開啟 Google Maps</span></span>
          <span class="addr-text">〒110-0003　東京都台東区根岸 2-13-13</span>
          <span class="addr-dist">🚶 JR 鶯谷站北口步行 3 分鐘</span>
        </a>
        <ul class="steps" style="margin-top:12px">
          <li><span class="step-num orange">●</span><span>A、B 方案<strong>都接得上</strong>——從阿美橫町搭 1 站回鶯谷，或本來就留在鶯谷，都走得到</span></li>
          <li><span class="step-num orange">●</span><span>毛巾與盥洗用品可現場<strong>租借或購買</strong>，不用特地從飯店帶</span></li>
          <li><span class="step-num orange">●</span><span>二樓食事處「こもれび」泡完可以再喝一杯（最後點餐 22:00）</span></li>
        </ul>
        <div class="alert">
          <span class="alert-icon">🕐</span>
          <span>昼夜時段營業到 <strong>25:00</strong>（最後受付 24:30），吃完飯再過來非常從容，把飛一整天的疲勞洗掉。</span>
        </div>
        <div class="alert" style="margin-top:8px">
          <span class="alert-icon">⚠️</span>
          <span><strong>每月第三個週二公休</strong>，出發前再確認一次；入浴前先在淋浴區把身體洗乾淨再下池是基本禮儀。</span>
        </div>
      </div>

      <!-- 回飯店 -->
      <div class="card hotel">
        <div class="card-header">
          <span class="card-icon">🏠</span>
          <span class="card-title">回飯店　第一天結束</span>
          <span class="card-time">約 22:00</span>
        </div>
        <ul class="steps">
          <li><span class="step-num purple">●</span><span>洗澡</span></li>
          <li><span class="step-num purple">●</span><span>整理行李</span></li>
          <li><span class="step-num purple">●</span><span>休息</span></li>
        </ul>
        <div class="alert">
          <span class="alert-icon">⏰</span>
          <span>明天富士山行程約 <strong>06:00</strong> 就要出門，今晚早點睡，鬧鐘先設好。</span>
        </div>
      </div>

      <!-- 最簡單版本 -->
      <div class="card tip">
        <div class="card-header">
          <span class="card-icon">🗺️</span>
          <span class="card-title">Day 1 最簡單版本</span>
        </div>
        <ul class="steps">
          <li><span class="step-num gray">✈️</span><span><strong>15:20</strong>　抵達成田機場</span></li>
          <li><span class="step-num gray">🚆</span><span>前往根岸</span></li>
          <li><span class="step-num gray">🏨</span><span><strong>18:00～18:30</strong>　Check-in</span></li>
          <li><span class="step-num gray">🚶</span><span><strong>18:30～19:00</strong>　鶯谷／根岸附近散步</span></li>
          <li><span class="step-num gray">🍢</span><span><strong>19:00～20:30</strong>　居酒屋／好吃晚餐</span></li>
          <li><span class="step-num gray">🛍️</span><span><strong>20:30～21:00</strong>　有體力 → 上野／阿美橫町　｜　累了 → 鶯谷附近隨便逛逛</span></li>
          <li><span class="step-num gray">♨️</span><span><strong>21:00～22:00</strong>　萩の湯泡湯</span></li>
          <li><span class="step-num gray">🏠</span><span><strong>約 22:00</strong>　回飯店</span></li>
        </ul>
      </div>

      <!-- 備忘 -->
      <div class="card tip">
        <div class="card-header">
          <span class="card-icon">📋</span>
          <span class="card-title">第一天行前備忘</span>
        </div>
        <ul class="steps">
          <li><span class="step-num gray">✓</span><span>Visit Japan Web 事先填好，入境比較快</span></li>
          <li><span class="step-num gray">✓</span><span>Skyliner 是否要先上網訂位</span></li>
          <li><span class="step-num gray">✓</span><span>Suica／PASMO（實體或手機）先準備好</span></li>
          <li><span class="step-num gray">✓</span><span>準備一點日幣現金，小居酒屋不一定收卡</span></li>
          <li><span class="step-num gray">✓</span><span>把住宿的<strong>日文地址</strong>存在手機，計程車或問路用得到</span></li>
          <li><span class="step-num gray">✓</span><span>出發前再確認一次候選居酒屋的公休日與營業時間</span></li>
          <li><span class="step-num gray">✓</span><span>網卡／漫遊在機場就開通，出站前先連上</span></li>
          <li><span class="step-num gray">✓</span><span>萩の湯每月第三個週二公休，確認當天有沒有開；有刺青的話也先查一下規定</span></li>
        </ul>
      </div>

      <div class="more-hint">✦ &nbsp; 路線：成田 → 鶯谷・根岸 → 居酒屋 → 萩の湯 &nbsp; ✦</div>

      <footer class="travel-footer">
        🇯🇵 Tokyo Trip &nbsp;｜&nbsp; Have a great journey!
      </footer>

      </div><!-- end tokyo day 1 -->

      <!-- 第二天 -->
      <div v-if="tokyoDay === 2">

      <div class="day-header">
        <div class="day-badge">
          <span class="badge-num">D2</span>
          <span class="badge-label">DAY 2</span>
        </div>
        <div class="day-info">
          <h2>富士山・河口湖一日遊 🗻</h2>
          <div class="day-weekday">2026 年 10 月 23 日（五）</div>
        </div>
      </div>

      <!-- 前往東京站 -->
      <div class="card transport">
        <div class="card-header">
          <span class="card-icon">🚃</span>
          <span class="card-title">住宿 → 東京站</span>
          <span class="card-time">約 06:00 出門</span>
        </div>
        <ul class="steps">
          <li><span class="step-num blue">1</span><span>約 <strong>06:00</strong> 從住宿出門，前往<strong>東京站</strong></span></li>
          <li><span class="step-num blue">2</span><span>走到<strong>八重洲南口</strong>的巴士乘車處，在 06:50 發車前就位</span></li>
        </ul>
        <div class="alert">
          <span class="alert-icon">💡</span>
          <span>東京站很大，第一次找乘車處容易繞路，<strong>寧可早到</strong>。</span>
        </div>
      </div>

      <!-- 高速巴士 -->
      <div class="card ticket">
        <div class="card-header">
          <span class="card-icon">🚌</span>
          <span class="card-title">FUJIYAMA CONNECT 高速巴士</span>
          <span class="status booked">已預訂</span>
          <span class="card-time">06:50 → 約 08:52</span>
        </div>
        <table class="info-table">
          <thead><tr><th>項目</th><th>內容</th></tr></thead>
          <tbody>
            <tr><td>日期</td><td><strong>2026/10/23（五）</strong></td></tr>
            <tr><td>區間</td><td>東京站八重洲南口 06:50 → 河口湖站 約 08:52</td></tr>
            <tr><td>巴士／車輛</td><td>巴士 <strong>0103</strong>　·　車輛 <strong>01</strong></td></tr>
            <tr><td>座位</td><td><strong>9A、9B</strong>（成人 2 位）</td></tr>
          </tbody>
        </table>
        <div class="alert" style="margin-top:14px">
          <span class="alert-icon">🎫</span>
          <span>上車時依<strong>訂位詳細頁面</strong>向司機出示 WEB 乘車券；此路線的乘車券<strong>沒有 QR Code</strong>。</span>
        </div>
        <div class="alert" style="margin-top:8px">
          <span class="alert-icon">⚠️</span>
          <span>出發前再次確認訂位頁面與業者通知。</span>
        </div>
      </div>

      <!-- 河口湖 -->
      <div class="card sightseeing">
        <div class="card-header">
          <span class="card-icon">🗻</span>
          <span class="card-title">河口湖周邊散步　＋ 大石公園</span>
          <span class="card-time">白天・依天氣調整</span>
        </div>
        <div class="spot-grid">
          <div class="spot-item clickable" @click="openSpot('kawaguchiko')">
            <div class="spot-icon">🗻</div>
            <div class="spot-name">河口湖 <span class="spot-arrow">›</span></div>
            <div class="spot-desc">富士五湖中交通最方便的一座，沿湖散步就能看富士山，天氣好時湖面還有倒影。</div>
          </div>
          <div class="spot-item clickable" @click="openSpot('oishipark')">
            <div class="spot-icon">🌸</div>
            <div class="spot-name">大石公園 <span class="spot-arrow">›</span></div>
            <div class="spot-desc">河口湖北岸的花園，花海、湖面和富士山可以拍進同一張照片。</div>
          </div>
        </div>
        <ul class="steps" style="margin-top:12px">
          <li><span class="step-num teal">●</span><span>河口湖周邊散步，<strong>欣賞富士山、拍照</strong></span></li>
          <li><span class="step-num teal">●</span><span>前往<strong>大石公園</strong></span></li>
          <li><span class="step-num teal">●</span><span>其他景點<strong>以當天交通、天氣和體力為準</strong></span></li>
        </ul>
      </div>

      <!-- 天上山纜車 -->
      <div class="card sightseeing">
        <div class="card-header">
          <span class="card-icon">🚡</span>
          <span class="card-title">天上山纜車</span>
          <span class="status optional">備選</span>
          <span class="card-time">視當天狀況</span>
        </div>
        <div class="spot-grid">
          <div class="spot-item clickable" @click="openSpot('tenjoyama')">
            <div class="spot-icon">🚡</div>
            <div class="spot-name">河口湖～富士山全景纜車 <span class="spot-arrow">›</span></div>
            <div class="spot-desc">搭纜車上天上山，從高處同時看河口湖與富士山。</div>
          </div>
        </div>
        <div class="alert">
          <span class="alert-icon">🤔</span>
          <span>依<strong>天氣、排隊狀況與剩餘時間</strong>決定要不要去。看不到富士山或隊伍太長，就直接跳過。</span>
        </div>
      </div>

      <!-- 回程 -->
      <div class="card transport">
        <div class="card-header">
          <span class="card-icon">🚆</span>
          <span class="card-title">回程　河口湖 → 立川 → 住宿</span>
          <span class="status pending">待確認</span>
          <span class="card-time">依已訂車票</span>
        </div>
        <ul class="steps">
          <li><span class="step-num blue">1</span><span>搭乘<strong>已安排的列車</strong>，從河口湖前往<strong>立川</strong></span></li>
          <li><span class="step-num blue">2</span><span>在立川轉搭電車，回東京住宿</span></li>
        </ul>
        <div class="alert">
          <span class="alert-icon">⚠️</span>
          <span>實際班次、出發時間與轉乘方式<strong>以已訂車票為準</strong>，出發前確認，這裡不預設時刻。</span>
        </div>
      </div>

      <!-- 晚上 -->
      <div class="card hotel">
        <div class="card-header">
          <span class="card-icon">🏠</span>
          <span class="card-title">晚上　宵夜或回住宿休息</span>
        </div>
        <ul class="steps">
          <li><span class="step-num purple">●</span><span>還有體力 → 住宿附近吃個宵夜</span></li>
          <li><span class="step-num purple">●</span><span>累了 → 直接回住宿休息，明天還有煙火</span></li>
        </ul>
      </div>

      <!-- 時間軸總覽 -->
      <div class="card tip">
        <div class="card-header">
          <span class="card-icon">🗓</span>
          <span class="card-title">第二天時間軸總覽</span>
        </div>
        <table class="info-table">
          <thead><tr><th>時間</th><th>行程</th></tr></thead>
          <tbody>
            <tr><td><strong>約 06:00</strong></td><td>從住宿出門，前往東京站</td></tr>
            <tr><td><strong>06:50</strong></td><td>🚌 東京站八重洲南口發車（已預訂）</td></tr>
            <tr><td><strong>約 08:52</strong></td><td>抵達河口湖站</td></tr>
            <tr><td><strong>白天</strong></td><td>🗻 河口湖散步 · 大石公園 ·（天上山纜車 備選）</td></tr>
            <tr><td><strong>回程</strong></td><td>🚆 河口湖 → 立川 → 住宿（班次依已訂車票，出發前確認）</td></tr>
            <tr><td><strong>晚上</strong></td><td>宵夜或休息</td></tr>
          </tbody>
        </table>
      </div>

      <!-- 備忘 -->
      <div class="card tip">
        <div class="card-header">
          <span class="card-icon">📋</span>
          <span class="card-title">第二天行前備忘</span>
        </div>
        <ul class="steps">
          <li><span class="step-num gray">✓</span><span>前一晚早點睡，確認 06:00 出門的路線</span></li>
          <li><span class="step-num gray">✓</span><span>手機確認<strong>巴士訂位詳細頁面</strong>打得開，上車要給司機看</span></li>
          <li><span class="step-num gray">✓</span><span>前一天查河口湖天氣，決定要不要排天上山纜車</span></li>
          <li><span class="step-num gray">✓</span><span>確認回程列車的車票與班次</span></li>
          <li><span class="step-num gray">✓</span><span>手機與行動電源充飽，今天拍照多</span></li>
        </ul>
      </div>

      <div class="more-hint">✦ &nbsp; 路線：東京站 → 河口湖 → 大石公園 → 立川 → 住宿 &nbsp; ✦</div>

      <footer class="travel-footer">
        🇯🇵 Tokyo Trip &nbsp;｜&nbsp; Have a great journey!
      </footer>

      </div><!-- end tokyo day 2 -->

      <!-- 第三天 -->
      <div v-if="tokyoDay === 3">

      <div class="day-header">
        <div class="day-badge">
          <span class="badge-num">D3</span>
          <span class="badge-label">DAY 3</span>
        </div>
        <div class="day-info">
          <h2>淺草・晴空塔・東京灣大華火祭 🎆</h2>
          <div class="day-weekday">2026 年 10 月 24 日（六）</div>
        </div>
      </div>

      <!-- 醒目提醒 -->
      <div class="alert alert-key">
        <span class="alert-icon">🎆</span>
        <span><strong>10/24（六）15:30 後只安排台場煙火相關行程，請提早前往會場。</strong>不排澀谷、新宿或其他景點；下午的移動與入場時間保留彈性。</span>
      </div>

      <!-- 淺草 -->
      <div class="card sightseeing">
        <div class="card-header">
          <span class="card-icon">⛩️</span>
          <span class="card-title">淺草寺・雷門・仲見世通</span>
          <span class="card-time">上午</span>
        </div>
        <div class="spot-grid">
          <div class="spot-item clickable" @click="openSpot('sensoji')">
            <div class="spot-icon">⛩️</div>
            <div class="spot-name">淺草寺・雷門 <span class="spot-arrow">›</span></div>
            <div class="spot-desc">東京最古老的寺院，雷門的大紅燈籠是東京最經典的拍照點。</div>
          </div>
          <div class="spot-item clickable" @click="openSpot('nakamise')">
            <div class="spot-icon">🏮</div>
            <div class="spot-name">仲見世通 <span class="spot-arrow">›</span></div>
            <div class="spot-desc">雷門到寶藏門之間的參道商店街，邊走邊吃傳統小吃。</div>
          </div>
        </div>
        <ul class="steps" style="margin-top:12px">
          <li><span class="step-num orange">1</span><span><strong>雷門</strong>拍照</span></li>
          <li><span class="step-num orange">2</span><span><strong>仲見世通</strong>逛街、吃小吃</span></li>
          <li><span class="step-num orange">3</span><span><strong>淺草寺</strong>參拜、拍照</span></li>
        </ul>
        <div class="alert">
          <span class="alert-icon">🍡</span>
          <span>可以吃<strong>人形燒、抹茶</strong>或其他日本特色小吃。</span>
        </div>
      </div>

      <!-- 晴空塔 -->
      <div class="card sightseeing">
        <div class="card-header">
          <span class="card-icon">🗼</span>
          <span class="card-title">東京晴空塔・Solamachi</span>
          <span class="card-time">中午</span>
        </div>
        <div class="spot-grid">
          <div class="spot-item clickable" @click="openSpot('skytree')">
            <div class="spot-icon">🗼</div>
            <div class="spot-name">東京晴空塔・Solamachi <span class="spot-arrow">›</span></div>
            <div class="spot-desc">634 公尺的電波塔，腳下的 Solamachi 商場可以逛街、吃午餐。</div>
          </div>
        </div>
        <ul class="steps" style="margin-top:12px">
          <li><span class="step-num teal">●</span><span>以 <strong>Solamachi 逛街、吃午餐</strong>為主</span></li>
          <li><span class="step-num teal">●</span><span>時間充裕的話在周邊拍照</span></li>
        </ul>
        <div class="alert">
          <span class="alert-icon">⚠️</span>
          <span><strong>不預設一定要登塔。</strong>若會影響前往煙火會場，優先取消登塔或縮短停留時間。</span>
        </div>
      </div>

      <!-- 前往台場 -->
      <div class="card transport">
        <div class="card-header">
          <span class="card-icon">🚃</span>
          <span class="card-title">晴空塔一帶 → 台場煙火會場</span>
          <span class="card-time">午餐後提早出發</span>
        </div>
        <ul class="steps">
          <li><span class="step-num blue">1</span><span>午餐後依當天交通狀況，<strong>提早</strong>從晴空塔一帶前往台場</span></li>
          <li><span class="step-num blue">2</span><span>預留<strong>車程、步行、排隊、驗票、入場與找座位</strong>的時間</span></li>
          <li><span class="step-num blue">3</span><span>依<strong>票券上指定的觀賞區、入口及入場規則</strong>行動</span></li>
          <li><span class="step-num blue">4</span><span>在允許的範圍內補充飲水與食物</span></li>
        </ul>
        <div class="alert">
          <span class="alert-icon">🚫</span>
          <span><strong>15:30 之後不再排任何其他觀光景點。</strong></span>
        </div>
        <div class="alert" style="margin-top:8px">
          <span class="alert-icon">⚠️</span>
          <span>交通管制、車站出入口與路線以<strong>當天官方公告</strong>為準，出發前確認，這裡不預設路線。</span>
        </div>
      </div>

      <!-- 煙火 -->
      <div class="card ticket">
        <div class="card-header">
          <span class="card-icon">🎆</span>
          <span class="card-title">東京灣大華火祭（台場觀賞區）</span>
          <span class="status booked">已預訂</span>
          <span class="card-time">傍晚～晚上</span>
        </div>
        <div class="spot-grid">
          <div class="spot-item clickable" @click="openSpot('odaiba')">
            <div class="spot-icon">🌉</div>
            <div class="spot-name">台場・東京灣夜景 <span class="spot-arrow">›</span></div>
            <div class="spot-desc">彩虹大橋與東京灣的夜景，今晚的主角是煙火。</div>
          </div>
        </div>
        <ul class="steps" style="margin-top:12px">
          <li><span class="step-num orange">●</span><span>欣賞煙火、拍照、享受東京灣夜景</span></li>
          <li><span class="step-num orange">●</span><span>活動結束後<strong>依現場工作人員指示離場</strong>，預留散場人潮與交通時間</span></li>
          <li><span class="step-num orange">●</span><span>晚餐依現場規定與體力彈性處理</span></li>
        </ul>
        <div class="alert">
          <span class="alert-icon">🎫</span>
          <span>以<strong>已購買的票券資訊</strong>及<strong>官方最新公告</strong>為準。煙火施放時間出發前確認。</span>
        </div>
        <div class="alert" style="margin-top:8px">
          <span class="alert-icon">🚫</span>
          <span>煙火結束後<strong>不安排</strong>立刻前往新宿、澀谷等遠距離行程，散場後直接回住宿。</span>
        </div>
      </div>

      <!-- 出發前確認 -->
      <div class="card tip">
        <div class="card-header">
          <span class="card-icon">📋</span>
          <span class="card-title">煙火日　出發前確認</span>
          <span class="status pending">待確認</span>
        </div>
        <ul class="steps">
          <li><span class="step-num gray">?</span><span>票券上的<strong>正式觀賞區名稱、指定入口與入場時間</strong></span></li>
          <li><span class="step-num gray">?</span><span>官方公布的<strong>煙火施放時間</strong>與活動規則</span></li>
          <li><span class="step-num gray">?</span><span>當日<strong>交通管制、車站出入口與散場動線</strong></span></li>
          <li><span class="step-num gray">?</span><span>會場是否允許<strong>攜帶外食、飲料</strong>或使用特定設施</span></li>
        </ul>
      </div>

      <!-- 時間軸總覽 -->
      <div class="card tip">
        <div class="card-header">
          <span class="card-icon">🗓</span>
          <span class="card-title">第三天時間軸總覽</span>
        </div>
        <table class="info-table">
          <thead><tr><th>時間</th><th>行程</th></tr></thead>
          <tbody>
            <tr><td><strong>上午</strong></td><td>⛩️ 雷門 · 仲見世通 · 淺草寺</td></tr>
            <tr><td><strong>中午</strong></td><td>🗼 晴空塔・Solamachi 逛街、午餐（登塔非必要）</td></tr>
            <tr><td><strong>午餐後</strong></td><td>🚃 提早前往台場，預留排隊與入場時間</td></tr>
            <tr><td><strong>15:30 起</strong></td><td>只做煙火相關的事，不排其他景點</td></tr>
            <tr><td><strong>傍晚～晚上</strong></td><td>🎆 東京灣大華火祭（施放時間出發前確認）</td></tr>
            <tr><td><strong>散場後</strong></td><td>依工作人員指示離場，回住宿</td></tr>
          </tbody>
        </table>
      </div>

      <div class="more-hint">✦ &nbsp; 路線：淺草 → 晴空塔 → 台場煙火 &nbsp; ✦</div>

      <footer class="travel-footer">
        🇯🇵 Tokyo Trip &nbsp;｜&nbsp; Have a great journey!
      </footer>

      </div><!-- end tokyo day 3 -->

      <!-- 第四天 -->
      <div v-if="tokyoDay === 4">

      <div class="day-header">
        <div class="day-badge">
          <span class="badge-num">D4</span>
          <span class="badge-label">DAY 4</span>
        </div>
        <div class="day-info">
          <h2>明治神宮・原宿・表參道・澀谷・新宿 🌳🛍️🌃</h2>
          <div class="day-weekday">2026 年 10 月 25 日（日）</div>
        </div>
      </div>

      <!-- 彈性提醒 -->
      <div class="card tip">
        <div class="card-header">
          <span class="card-icon">🌿</span>
          <span class="card-title">彈性較高的一天</span>
        </div>
        <div class="alert" style="margin-top:0">
          <span class="alert-icon">💚</span>
          <span>今天接手原本週六下午到晚上的購物與夜生活。下面的時段只是<strong>大概的順序</strong>，不用每個點都準時抵達，逛得開心就多待一點。</span>
        </div>
      </div>

      <!-- 明治神宮 -->
      <div class="card sightseeing">
        <div class="card-header">
          <span class="card-icon">⛩️</span>
          <span class="card-title">明治神宮</span>
          <span class="card-time">上午</span>
        </div>
        <div class="spot-grid">
          <div class="spot-item clickable" @click="openSpot('meiji')">
            <div class="spot-icon">🌳</div>
            <div class="spot-name">明治神宮 <span class="spot-arrow">›</span></div>
            <div class="spot-desc">都心裡的一大片森林，走進參道就安靜下來，是東京綠意的一面。</div>
          </div>
        </div>
        <ul class="steps" style="margin-top:12px">
          <li><span class="step-num teal">●</span><span>參拜</span></li>
          <li><span class="step-num teal">●</span><span>在神宮周邊的<strong>林蔭步道</strong>散步</span></li>
        </ul>
      </div>

      <!-- 原宿・表參道 -->
      <div class="card sightseeing">
        <div class="card-header">
          <span class="card-icon">🛍️</span>
          <span class="card-title">原宿・表參道</span>
          <span class="card-time">中午～下午</span>
        </div>
        <div class="spot-grid">
          <div class="spot-item clickable" @click="openSpot('takeshita')">
            <div class="spot-icon">🍭</div>
            <div class="spot-name">竹下通 <span class="spot-arrow">›</span></div>
            <div class="spot-desc">原宿站對面的窄長街道，潮流小店和可麗餅等小吃擠滿兩側。</div>
          </div>
          <div class="spot-item clickable" @click="openSpot('omotesando')">
            <div class="spot-icon">🌳</div>
            <div class="spot-name">表參道 <span class="spot-arrow">›</span></div>
            <div class="spot-desc">櫸木林蔭大道，兩側是精品旗艦店與設計感建築，適合慢慢散步。</div>
          </div>
        </div>
        <ul class="steps" style="margin-top:12px">
          <li><span class="step-num purple">●</span><span><strong>竹下通</strong>逛街、吃小吃</span></li>
          <li><span class="step-num purple">●</span><span><strong>表參道</strong>散步、逛店</span></li>
          <li><span class="step-num purple">●</span><span><strong>CELINE</strong></span></li>
          <li><span class="step-num purple">●</span><span>找<strong>咖啡廳</strong>休息、吃甜點</span></li>
        </ul>
      </div>

      <!-- 澀谷 -->
      <div class="card sightseeing">
        <div class="card-header">
          <span class="card-icon">🚥</span>
          <span class="card-title">澀谷</span>
          <span class="card-time">下午～傍晚</span>
        </div>
        <div class="spot-grid">
          <div class="spot-item clickable" @click="openSpot('shibuya')">
            <div class="spot-icon">🚥</div>
            <div class="spot-name">澀谷十字路口 <span class="spot-arrow">›</span></div>
            <div class="spot-desc">綠燈一亮，人潮從四面八方同時穿越，東京最有代表性的街景。</div>
          </div>
          <div class="spot-item clickable" @click="openSpot('nintendo')">
            <div class="spot-icon">🎮</div>
            <div class="spot-name">Nintendo TOKYO <span class="spot-arrow">›</span></div>
            <div class="spot-desc">任天堂在東京的直營店，位在澀谷 PARCO 裡。</div>
          </div>
          <div class="spot-item clickable" @click="openSpot('shibuyasky')">
            <div class="spot-icon">🌆</div>
            <div class="spot-name">SHIBUYA SKY <span class="spot-arrow">›</span></div>
            <div class="spot-desc">澀谷 Scramble Square 頂樓的露天展望台，需要預約時段。</div>
          </div>
        </div>
        <ul class="steps" style="margin-top:12px">
          <li><span class="step-num orange">●</span><span><strong>澀谷十字路口</strong>拍照</span></li>
          <li><span class="step-num orange">●</span><span>澀谷商圈逛街</span></li>
          <li><span class="step-num orange">●</span><span><strong>Nintendo TOKYO</strong></span></li>
          <li><span class="step-num orange">●</span><span><strong>SHIBUYA SKY</strong>　<span class="status pending">待確認</span></span></li>
        </ul>
        <div class="alert">
          <span class="alert-icon">⚠️</span>
          <span>SHIBUYA SKY 要<strong>依已預約的時段</strong>調整當天路線；時段還沒確認，若和上面的順序對不上，要回頭調整前後行程。</span>
        </div>
      </div>

      <!-- 新宿 -->
      <div class="card food">
        <div class="card-header">
          <span class="card-icon">🌃</span>
          <span class="card-title">新宿　逛街・晚餐・夜生活</span>
          <span class="card-time">晚上</span>
        </div>
        <div class="spot-grid">
          <div class="spot-item clickable" @click="openSpot('shinjuku')">
            <div class="spot-icon">🌃</div>
            <div class="spot-name">新宿 <span class="spot-arrow">›</span></div>
            <div class="spot-desc">百貨、居酒屋和霓虹招牌密集的不夜城，晚上最有東京大城市的感覺。</div>
          </div>
        </div>
        <ul class="steps" style="margin-top:12px">
          <li><span class="step-num food-color">●</span><span>新宿逛街、吃晚餐</span></li>
          <li><span class="step-num food-color">●</span><span>體力與時間允許的話，去<strong>新宿二丁目</strong>體驗東京夜生活</span></li>
          <li><span class="step-num food-color">●</span><span>依體力決定停留時間，再回住宿休息</span></li>
        </ul>
      </div>

      <!-- 東京鐵塔（備選） -->
      <div class="card tip">
        <div class="card-header">
          <span class="card-icon">🗼</span>
          <span class="card-title">東京鐵塔</span>
          <span class="status optional">備選</span>
        </div>
        <div class="spot-grid">
          <div class="spot-item clickable" @click="openSpot('tokyotower')">
            <div class="spot-icon">🗼</div>
            <div class="spot-name">東京鐵塔 <span class="spot-arrow">›</span></div>
            <div class="spot-desc">1958 年完工的紅白鐵塔，入夜點燈後是東京的經典夜景。</div>
          </div>
        </div>
        <div class="alert">
          <span class="alert-icon">🤔</span>
          <span><strong>不是今天的必排項目。</strong>如果想加入，要先評估交通與時間：可以縮短新宿行程，或替換其他夜景景點。還沒決定前不排進固定行程。</span>
        </div>
      </div>

      <!-- 時間軸總覽 -->
      <div class="card tip">
        <div class="card-header">
          <span class="card-icon">🗓</span>
          <span class="card-title">第四天大概順序</span>
        </div>
        <table class="info-table">
          <thead><tr><th>時段</th><th>行程</th></tr></thead>
          <tbody>
            <tr><td><strong>上午</strong></td><td>⛩️ 明治神宮參拜、林蔭步道散步</td></tr>
            <tr><td><strong>中午～下午</strong></td><td>🛍️ 竹下通 · 表參道 · CELINE · 咖啡廳</td></tr>
            <tr><td><strong>下午～傍晚</strong></td><td>🚥 澀谷十字路口 · 商圈 · Nintendo TOKYO · SHIBUYA SKY（依預約時段）</td></tr>
            <tr><td><strong>晚上</strong></td><td>🌃 新宿逛街、晚餐 ·（新宿二丁目 看體力）</td></tr>
            <tr><td><strong>備選</strong></td><td>🗼 東京鐵塔（尚未決定）</td></tr>
          </tbody>
        </table>
      </div>

      <div class="more-hint">✦ &nbsp; 路線：明治神宮 → 原宿・表參道 → 澀谷 → 新宿 &nbsp; ✦</div>

      <footer class="travel-footer">
        🇯🇵 Tokyo Trip &nbsp;｜&nbsp; Have a great journey!
      </footer>

      </div><!-- end tokyo day 4 -->

      <!-- 第五天 -->
      <div v-if="tokyoDay === 5">

      <div class="day-header">
        <div class="day-badge">
          <span class="badge-num">D5</span>
          <span class="badge-label">DAY 5</span>
        </div>
        <div class="day-info">
          <h2>最後半天・回台灣 ✈️</h2>
          <div class="day-weekday">2026 年 10 月 26 日（一）</div>
        </div>
      </div>

      <!-- 退房 -->
      <div class="card hotel">
        <div class="card-header">
          <span class="card-icon">🏨</span>
          <span class="card-title">退房 ＋ 寄放行李</span>
          <span class="status pending">待確認</span>
          <span class="card-time">早上</span>
        </div>
        <ul class="steps">
          <li><span class="step-num purple">1</span><span>早上<strong>退房</strong></span></li>
          <li><span class="step-num purple">2</span><span>依住宿規定<strong>寄放行李</strong></span></li>
        </ul>
        <div class="alert">
          <span class="alert-icon">🧳</span>
          <span>住宿能不能寄放行李<strong>出發前確認</strong>；如果不能，需要另找行李寄存方案。</span>
        </div>
      </div>

      <!-- 最後散步 -->
      <div class="card sightseeing">
        <div class="card-header">
          <span class="card-icon">☕</span>
          <span class="card-title">早餐・散步・最後採買</span>
          <span class="card-time">上午～下午</span>
        </div>
        <ul class="steps">
          <li><span class="step-num teal">●</span><span>在<strong>住宿附近、日暮里或上野</strong>一帶吃早餐、散步</span></li>
          <li><span class="step-num teal">●</span><span><strong>最後採買</strong></span></li>
          <li><span class="step-num teal">●</span><span>回去取行李</span></li>
        </ul>
      </div>

      <!-- 前往機場 -->
      <div class="card transport">
        <div class="card-header">
          <span class="card-icon">🚃</span>
          <span class="card-title">前往成田機場</span>
          <span class="card-time">目標 17:00～17:30 抵達</span>
        </div>
        <ul class="steps">
          <li><span class="step-num blue">1</span><span>取回行李，搭車前往<strong>成田機場</strong></span></li>
          <li><span class="step-num blue">2</span><span>目標約 <strong>17:00～17:30</strong> 抵達機場</span></li>
          <li><span class="step-num blue">3</span><span>辦理報到、安檢、逛免稅店</span></li>
        </ul>
        <div class="alert">
          <span class="alert-icon">⚠️</span>
          <span>機場交通方式<strong>出發前確認</strong>（Day 1 有京成線的路線可以參考，方向反過來）。</span>
        </div>
      </div>

      <!-- 回程航班 -->
      <div class="card transport">
        <div class="card-header">
          <span class="card-icon">✈️</span>
          <span class="card-title">回程航班　虎航 TR875</span>
          <span class="card-time">19:55 起飛 → 23:10 抵台</span>
        </div>
        <table class="info-table">
          <thead><tr><th>項目</th><th>內容</th></tr></thead>
          <tbody>
            <tr><td>日期</td><td><strong>2026/10/26（一）</strong></td></tr>
            <tr><td>航班</td><td><strong>虎航 TR875</strong></td></tr>
            <tr><td>出發</td><td>🛫 <strong>19:55</strong>　成田機場 <strong>第一航廈</strong>（日本時間）</td></tr>
            <tr><td>抵達</td><td>🛬 <strong>23:10</strong>　桃園機場 <strong>第一航廈</strong>（台灣時間）</td></tr>
            <tr><td>飛行時間</td><td>約 4 小時 15 分</td></tr>
            <tr><td>行李</td><td>🧳 加購托運行李 <strong>20 公斤</strong></td></tr>
          </tbody>
        </table>
        <div class="alert" style="margin-top:14px">
          <span class="alert-icon">⏰</span>
          <span>航空公司<strong>報到截止時間</strong>出發前確認。<strong>以不錯過班機為最高優先。</strong></span>
        </div>
        <div class="alert" style="margin-top:8px">
          <span class="alert-icon">🧳</span>
          <span>回程有最後採買，打包時注意行李<strong>不要超過 20 公斤</strong>。</span>
        </div>
      </div>

      <!-- 時間軸總覽 -->
      <div class="card tip">
        <div class="card-header">
          <span class="card-icon">🗓</span>
          <span class="card-title">第五天時間軸總覽</span>
        </div>
        <table class="info-table">
          <thead><tr><th>時間</th><th>行程</th></tr></thead>
          <tbody>
            <tr><td><strong>早上</strong></td><td>🏨 退房、寄放行李</td></tr>
            <tr><td><strong>上午～下午</strong></td><td>☕ 住宿附近／日暮里／上野 早餐散步 · 最後採買</td></tr>
            <tr><td><strong>下午</strong></td><td>🧳 取回行李，前往成田機場</td></tr>
            <tr><td><strong>17:00～17:30</strong></td><td>抵達成田機場，報到、安檢、免稅店</td></tr>
            <tr><td><strong>19:55</strong></td><td>✈️ 虎航 TR875 起飛</td></tr>
            <tr><td><strong>23:10</strong></td><td>🛬 抵達桃園機場第一航廈（台灣時間）</td></tr>
          </tbody>
        </table>
      </div>

      <footer class="travel-footer">
        🇯🇵 Tokyo Trip &nbsp;｜&nbsp; Have a great journey home!
      </footer>

      </div><!-- end tokyo day 5 -->

      <!-- 美食 -->
      <div v-if="tokyoDay === 7">

      <div class="day-header">
        <div class="day-badge" style="background: linear-gradient(135deg,#e67e22,#f0a04b); box-shadow: 0 4px 12px rgba(230,126,34,.4)">
          <span class="badge-num">🍜</span>
          <span class="badge-label">FOOD</span>
        </div>
        <div class="day-info">
          <h2>東京美食清單</h2>
          <div class="day-weekday">依區域整理，對照行程看哪天順路</div>
        </div>
      </div>

      <div class="alert" style="margin:0 0 1rem">
        <span class="alert-icon">⚠️</span>
        <span>營業時間<strong>以店家公告為準</strong>，出發前再確認一次；標「待確認」的店還沒有可靠的營業時段。</span>
      </div>

      <div v-for="area in tokyoFoodAreas" :key="area.area" class="card food">
        <div class="card-header">
          <span class="card-icon">📍</span>
          <span class="card-title">{{ area.area }}</span>
        </div>
        <div v-for="shop in area.shops" :key="shop.name" class="food-shop">
          <div class="food-shop-head">
            <span class="food-name">{{ shop.name }}</span>
            <span v-if="!shop.hours.length" class="status pending">營業時間待確認</span>
          </div>
          <div class="food-cuisine">{{ shop.cuisine }}</div>
          <figure v-if="shop.photo" class="food-photo">
            <img :src="shop.photo.url" :alt="shop.photo.caption" loading="lazy" @error="onImgError" />
            <figcaption>{{ shop.photo.caption }}　·　Photo — {{ shop.photo.credit }} / Wikimedia Commons</figcaption>
          </figure>
          <a
            :href="mapsUrl(shop)"
            target="_blank"
            rel="noopener noreferrer"
            class="address-box address-link"
            style="margin-top:10px"
          >
            <span class="addr-label">地址　<span class="map-hint">📍 點擊開啟 Google Maps</span></span>
            <span class="addr-text">{{ shop.address }}</span>
          </a>
          <ul v-if="shop.hours.length || shop.notes.length" class="steps" style="margin-top:8px">
            <li v-for="h in shop.hours" :key="h"><span class="step-num food-color">🕐</span><span>{{ h }}</span></li>
            <li v-for="n in shop.notes" :key="n"><span class="step-num gray">●</span><span>{{ n }}</span></li>
          </ul>
          <div class="alert">
            <span class="alert-icon">🗓</span>
            <span>{{ shop.fit }}</span>
          </div>
        </div>
      </div>

      <footer class="travel-footer">
        🇯🇵 Tokyo Trip &nbsp;｜&nbsp; Have a great journey!
      </footer>

      </div><!-- end tokyo food -->

      <!-- 清單 -->
      <div v-if="tokyoDay === 6">

      <div class="day-header">
        <div class="day-badge" style="background: linear-gradient(135deg,#7b5ea7,#a07cc0)">
          <span class="badge-num">✦</span>
          <span class="badge-label">CHECK</span>
        </div>
        <div class="day-info">
          <h2>預訂狀態 ＆ 出發前清單</h2>
          <div class="day-weekday">已預訂・待確認・備選，一次看清楚</div>
        </div>
      </div>

      <!-- 旅行期待 -->
      <div class="card tip">
        <div class="card-header">
          <span class="card-icon">💞</span>
          <span class="card-title">這趟旅行的期待</span>
        </div>
        <ul class="steps">
          <li><span class="step-num gray">🗻</span><span>富士山、河口湖</span></li>
          <li><span class="step-num gray">⛩️</span><span>淺草寺、雷門、仲見世通商店街</span></li>
          <li><span class="step-num gray">🌃</span><span>晴空塔、澀谷、新宿</span></li>
          <li><span class="step-num gray">🌳</span><span>明治神宮、原宿、表參道</span></li>
          <li><span class="step-num gray">🛍️</span><span>逛街、CELINE、Nintendo TOKYO</span></li>
          <li><span class="step-num gray">🎆</span><span>東京灣大華火祭、台場夜景</span></li>
          <li><span class="step-num gray">🍜</span><span>日本美食、咖啡廳、居酒屋</span></li>
          <li><span class="step-num gray">♨️</span><span>錢湯泡湯、體驗東京日常生活</span></li>
        </ul>
        <div class="alert">
          <span class="alert-icon">💚</span>
          <span>兩個人一起看漂亮的風景、吃好吃的東西，也保留隨意散步與休息時間，<strong>不需要每天趕行程</strong>。</span>
        </div>
      </div>

      <!-- 已預訂 -->
      <div class="card ticket">
        <div class="card-header">
          <span class="card-icon">🎫</span>
          <span class="card-title">已預訂</span>
          <span class="status booked">已預訂</span>
        </div>
        <table class="info-table">
          <thead><tr><th>日期</th><th>項目</th></tr></thead>
          <tbody>
            <tr><td><strong>10/23（五）</strong></td><td>🚌 FUJIYAMA CONNECT 高速巴士　東京站八重洲南口 06:50 → 河口湖，座位 9A・9B</td></tr>
            <tr><td><strong>10/24（六）</strong></td><td>🎆 東京灣大華火祭觀賞票（以票券內容為準）</td></tr>
          </tbody>
        </table>
      </div>

      <!-- 待確認 -->
      <div class="card tip">
        <div class="card-header">
          <span class="card-icon">❓</span>
          <span class="card-title">出發前確認</span>
          <span class="status pending">待確認</span>
        </div>
        <ul class="steps">
          <li><span class="step-num gray">D1</span><span>成田 → 住宿的交通方式；萩の湯當天營業時間</span></li>
          <li><span class="step-num gray">D2</span><span>巴士訂位頁面與業者通知；<strong>回程列車（河口湖 → 立川）實際班次</strong></span></li>
          <li><span class="step-num gray">D3</span><span>煙火<strong>官方最新規則、施放時間、指定入口與觀賞區</strong>；當日交通管制與散場動線；外食飲料規定</span></li>
          <li><span class="step-num gray">D4</span><span><strong>SHIBUYA SKY 預約時段</strong>；東京鐵塔要不要去</span></li>
          <li><span class="step-num gray">D5</span><span>住宿能否寄放行李；機場交通；虎航報到截止時間</span></li>
        </ul>
      </div>

      <!-- 備選 -->
      <div class="card tip">
        <div class="card-header">
          <span class="card-icon">🤔</span>
          <span class="card-title">備選景點</span>
          <span class="status optional">備選</span>
        </div>
        <div class="spot-grid">
          <div class="spot-item clickable" @click="openSpot('tenjoyama')">
            <div class="spot-icon">🚡</div>
            <div class="spot-name">天上山纜車 <span class="spot-arrow">›</span></div>
            <div class="spot-desc">D2 河口湖。依天氣、排隊和剩餘時間決定。</div>
          </div>
          <div class="spot-item clickable" @click="openSpot('tokyotower')">
            <div class="spot-icon">🗼</div>
            <div class="spot-name">東京鐵塔 <span class="spot-arrow">›</span></div>
            <div class="spot-desc">D4 晚上。要去的話縮短新宿或替換其他夜景。</div>
          </div>
        </div>
      </div>

      <footer class="travel-footer">
        🇯🇵 Tokyo Trip &nbsp;｜&nbsp; Have a great journey!
      </footer>

      </div><!-- end tokyo check -->

    </div><!-- end tokyo -->

    <!-- ── 景點 Modal ── -->
    <Transition name="modal">
      <div v-if="activeSpot" class="modal-overlay" @click.self="activeSpot = null">
        <div class="modal-box">

          <!-- 關閉 -->
          <button class="modal-close" @click="activeSpot = null">✕</button>

          <!-- 標題 -->
          <div class="modal-header">
            <span class="modal-icon">{{ spots[activeSpot].icon }}</span>
            <div>
              <div class="modal-title">{{ spots[activeSpot].name }}</div>
              <div class="modal-subtitle">{{ spots[activeSpot].subtitle }}</div>
            </div>
          </div>

          <!-- 照片 -->
          <div v-if="spots[activeSpot].photos.length" class="photo-gallery">
            <div class="photo-main">
              <img :src="spots[activeSpot].photos[photoIndex]" :alt="spots[activeSpot].name" @error="onImgError" />
            </div>
            <div class="photo-thumbs">
              <img
                v-for="(url, i) in spots[activeSpot].photos"
                :key="i"
                :src="url"
                :class="{ active: i === photoIndex }"
                @click="photoIndex = i"
                @error="onImgError"
              />
            </div>
          </div>

          <!-- 詳細介紹 -->
          <div class="modal-desc">{{ spots[activeSpot].desc }}</div>

          <!-- 地址 -->
          <a
            v-if="spots[activeSpot].address"
            :href="mapsUrl(spots[activeSpot])"
            target="_blank"
            rel="noopener noreferrer"
            class="address-box address-link modal-address"
          >
            <span class="addr-label">地址　<span class="map-hint">📍 點擊開啟 Google Maps</span></span>
            <span class="addr-text">{{ spots[activeSpot].address }}</span>
          </a>

          <!-- 資訊列 -->
          <div class="modal-info-grid">
            <div v-for="info in spots[activeSpot].infos" :key="info.label" class="info-chip">
              <span class="info-chip-icon">{{ info.icon }}</span>
              <div>
                <div class="info-chip-label">{{ info.label }}</div>
                <div class="info-chip-value">{{ info.value }}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Transition>

    </div>
  </PortfolioPageShell>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PortfolioPageShell from '@/components/portfolio/PortfolioPageShell.vue'
import PortfolioSubNav from '@/components/portfolio/PortfolioSubNav.vue'

const tabs = [
  { key: 'nagoya',   label: '名古屋', icon: '🏯' },
  { key: 'hongkong', label: '香港',   icon: '🏮' },
  { key: 'tokyo',    label: '東京',   icon: '🗼' },
]
const activeTab = ref('nagoya')

const dayTabs = [
  { day: 1, date: '6/18' },
  { day: 2, date: '6/19' },
  { day: 3, date: '6/20' },
  { day: 4, date: '6/21' },
  { day: 5, date: '6/22' },
]
const activeDay = ref(1)

/* 東京分頁的天數獨立記，跟名古屋的 activeDay 互不影響；6 是清單分頁 */
const tokyoDayTabs = [
  { day: 1, date: '10/22' },
  { day: 2, date: '10/23' },
  { day: 3, date: '10/24' },
  { day: 4, date: '10/25' },
  { day: 5, date: '10/26' },
]
const tokyoDay = ref(1)

/* 東京美食分頁（tokyoDay 7）；hours 留空的店會顯示「營業時間待確認」 */
interface FoodShop {
  name: string
  cuisine: string
  address: string
  mapQuery: string
  hours: string[]
  notes: string[]
  /* 對照行程：哪天順路、哪天剛好公休 */
  fit: string
  /* 只用 Commons 上授權可用的照片；找不到店家本身的照片時用同類料理，caption 標「示意圖」 */
  photo?: { url: string; caption: string; credit: string }
}

const tokyoFoodAreas: { area: string; shops: FoodShop[] }[] = [
  {
    area: '原宿・表參道一帶',
    shops: [
      {
        name: 'AFURI 阿夫利 原宿店',
        cuisine: '🍜 柚子鹽拉麵',
        address: '澀谷區千駄谷 3-63-1　原宿 Grand Foresta 1F',
        mapQuery: 'AFURI 原宿',
        photo: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Yuzu_Shio_Ramen_%40_Afuri_%40_Ebisu_%2814018053090%29.jpg/960px-Yuzu_Shio_Ramen_%40_Afuri_%40_Ebisu_%2814018053090%29.jpg',
          caption: 'AFURI 惠比壽店的柚子鹽拉麵',
          credit: 'Guilhem Vellut, CC BY 2.0',
        },
        hours: [],
        notes: [],
        fit: 'D4（週日）逛原宿・表參道時順路，可以當午餐。',
      },
    ],
  },
  {
    area: '西新橋・新橋一帶',
    shops: [
      {
        name: 'ヘッケルン（Hekkelun）',
        cuisine: '☕ 日式喫茶店・布丁',
        address: '港區西新橋 1-20-11　安藤大樓 1F',
        mapQuery: 'ヘッケルン 西新橋',
        photo: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Japanese_Caramel_Custard_Pudding%2C_Purin%2C_Flan.jpg',
          caption: '示意圖：日式布丁（非本店）',
          credit: 'Clairenguyen23, CC BY-SA 4.0',
        },
        hours: [],
        notes: ['留意平日營業、週末公休的安排'],
        fit: '不在目前路線上；如果週末公休，這趟只有 10/22（四）、10/23（五）、10/26（一）是平日，要排的話需要另外調整。',
      },
    ],
  },
  {
    area: '谷中・千駄木一帶',
    shops: [
      {
        name: '宿木カフェ（Yadorigi Cafe）',
        cuisine: '🐱 咖啡・餐點・保護貓咖啡廳',
        address: '台東區谷中 3-15-1',
        mapQuery: '宿木カフェ 谷中',
        photo: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Its_raining_cats_and_cats%2C_cat_cafe_Nekorobi_in_Ikebukuro%2C_Tokyo_%282012_photo%3B_cropped_2022%29.jpg/960px-Its_raining_cats_and_cats%2C_cat_cafe_Nekorobi_in_Ikebukuro%2C_Tokyo_%282012_photo%3B_cropped_2022%29.jpg',
          caption: '示意圖：東京的貓咖啡廳（非本店）',
          credit: 'Takashi Hososhima, CC BY-SA 2.0',
        },
        hours: ['週三、週五：11:00–19:00', '週四：11:00–21:00', '週六、週日：11:00–19:00', '公休：週一、週二'],
        notes: ['不同訂餐平台的週三、週五時段略有出入，以店家公告為準'],
        fit: '谷中離日暮里很近，但 D5（10/26）是週一公休。D1（週四）營業到 21:00，鶯谷過去不遠，可以當備案。',
      },
    ],
  },
  {
    area: '新宿一帶',
    shops: [
      {
        name: 'Hokuto 大衆すき焼き北斗',
        cuisine: '🥩 壽喜燒',
        address: '新宿區新宿 3-34-11　Peace 大樓 5F',
        mapQuery: '大衆すき焼き北斗 新宿中央東口店',
        photo: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Sukiyaki_01.jpg/960px-Sukiyaki_01.jpg',
          caption: '示意圖：壽喜燒（非本店）',
          credit: 'ajari, CC BY 2.0',
        },
        hours: [],
        notes: [],
        fit: 'D4（週日）晚上在新宿，可以當晚餐候選。',
      },
      {
        name: 'WAGYU SUKIYAKI 極 GOKU',
        cuisine: '🥩 A5 和牛壽喜燒',
        address: '新宿區新宿 3-35-17　F.U.Assets 1F',
        mapQuery: 'WAGYU SUKIYAKI 極 GOKU 新宿',
        photo: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Yonezawa_beef_sukiyaki_at_pension_in_Yonezawa_Ski_Resort.jpg/960px-Yonezawa_beef_sukiyaki_at_pension_in_Yonezawa_Ski_Resort.jpg',
          caption: '示意圖：和牛壽喜燒（非本店）',
          credit: 'Syced, CC0',
        },
        hours: ['每日：11:00–23:00'],
        notes: ['官方店家資訊標示全年無休'],
        fit: 'D4（週日）晚上在新宿，可以當晚餐候選。',
      },
    ],
  },
  {
    area: '人形町・日本橋一帶',
    shops: [
      {
        name: '焼肉Happy（焼肉はっぴぃ）',
        cuisine: '🔥 日式燒肉',
        address: '中央區日本橋人形町 1-4-13　重本大樓 1F',
        mapQuery: '焼肉はっぴぃ 人形町',
        photo: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Yakiniku_002.jpg/960px-Yakiniku_002.jpg',
          caption: '示意圖：日式燒肉（非本店）',
          credit: 'Jonathan Lin, CC BY-SA 2.0',
        },
        hours: [],
        notes: [],
        fit: '不在目前路線上，要去的話需要另外安排時間。',
      },
    ],
  },
  {
    area: '神樂坂一帶',
    shops: [
      {
        name: 'Salmon noodle 3.0（サーモンnoodle3.0）',
        cuisine: '🍜 鮭魚拉麵・創意法式拉麵',
        address: '新宿區神樂坂 6-26　Casa Ioki 3，102 室',
        mapQuery: 'サーモンnoodle3.0 神楽坂',
        photo: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Bowl_of_shio_ramen_with_pork.jpg/960px-Bowl_of_shio_ramen_with_pork.jpg',
          caption: '示意圖：鹽味拉麵（非本店，也不是鮭魚拉麵）',
          credit: 'GiveMeMollusks, CC0',
        },
        hours: ['午餐：11:00–15:30（最後點餐 15:10）', '晚餐：17:00–21:00（最後點餐 20:40）'],
        notes: ['公休日不固定'],
        fit: '不在目前路線上，要去的話需要另外安排時間。',
      },
    ],
  },
  {
    area: '銀座一帶',
    shops: [
      {
        name: 'ST. SAWAI オリオンズ（Ginza Orions）',
        cuisine: '🍸 復古餐廳酒吧・咖啡時段',
        address: '中央區銀座 7-3-13　新銀座大樓 1 號館 10F',
        mapQuery: 'ST.SAWAIオリオンズ 銀座',
        photo: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/%E5%90%8D%E6%9B%B2%E5%96%AB%E8%8C%B6%E3%83%B4%E3%82%A3%E3%82%AA%E3%83%AD%E3%83%B3.jpg/960px-%E5%90%8D%E6%9B%B2%E5%96%AB%E8%8C%B6%E3%83%B4%E3%82%A3%E3%82%AA%E3%83%AD%E3%83%B3.jpg',
          caption: '示意圖：東京的復古喫茶店（非本店）',
          credit: 'Eugene Ormandy, CC BY-SA 4.0',
        },
        hours: ['咖啡時段：13:00–18:00', '晚餐時段：18:00–23:00（最後點餐 22:00）', '公休：週六、週日及日本國定假日'],
        notes: ['晚餐時段可能有服務費'],
        fit: '週六、週日公休，這趟的平日分別是抵達日、河口湖日和回程日，目前排不太進去。',
      },
    ],
  },
]

type SpotKey =
  | 'sakae' | 'oasis' | 'tvtower' | 'mitsui' | 'nagoyacastle' | 'osu' | 'asunal' | 'aeon' | 'inuyama' | 'jokamachi'
  /* 東京 */
  | 'uguisudani' | 'izakaya' | 'ameyoko' | 'haginoyu'
  | 'kawaguchiko' | 'oishipark' | 'tenjoyama'
  | 'sensoji' | 'nakamise' | 'skytree' | 'odaiba'
  | 'meiji' | 'takeshita' | 'omotesando' | 'shibuya' | 'shibuyasky' | 'nintendo' | 'shinjuku' | 'tokyotower'

const activeSpot = ref<SpotKey | null>(null)
const photoIndex = ref(0)

function openSpot(key: SpotKey) {
  photoIndex.value = 0
  activeSpot.value = key
}

watch(activeSpot, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})

function onImgError(e: Event) {
  (e.target as HTMLImageElement).style.display = 'none'
}

interface Spot {
  icon: string
  name: string
  subtitle: string
  desc: string
  /* 地址與 Google Maps 查詢字串；沒填的景點不會顯示地址區塊 */
  address?: string
  mapQuery?: string
  photos: string[]
  infos: { icon: string; label: string; value: string }[]
}

/* 用店名／地名查詢比用地址穩，日文名稱 Google Maps 幾乎都能直接定位 */
function mapsUrl(place: { name: string; mapQuery?: string }): string {
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(place.mapQuery ?? place.name)
}

const spots: Record<SpotKey, Spot> = {
  sakae: {
    icon: '🛍',
    name: '榮商圈',
    subtitle: 'Sakae, Nagoya',
    address: '愛知県名古屋市中区栄　（栄三丁目一帯）',
    mapQuery: '栄 名古屋市中区',
    desc: '榮商圈是名古屋最繁華的商業娛樂核心，自江戶時代便是名古屋城東南要道，明治維新後逐步發展為現代商業重鎮。商圈內匯聚松坂屋（1910年開業，名古屋首家百貨）、PARCO、LACHIC 等頂級百貨，以及地下街、唐吉軻德等多元購物選擇。地標「名古屋電視塔」建於1954年，是日本首座電視塔，登上 MIRAI360 展望台可俯瞰 90 公尺高的城市全景。久屋大通公園貫穿商圈，綠意盎然、寬敞舒適，旁邊還有 SUNSHINE SAKAE 摩天輪可欣賞浪漫夜景。愛知縣美術館與愛知縣藝術劇場亦坐落於此，使榮商圈兼具購物、休閒與文化深度。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/2/24/Nagoya_Sakae_area_from_Midland_Square.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/b/bc/Sakae_night.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/7/76/Street_view_of_Sakae%2C_Nagoya_at_night_20150124.JPG',
    ],
    infos: [
      { icon: '🚇', label: '交通', value: '地下鐵東山線／名城線「榮站」直達' },
      { icon: '🕐', label: '建議停留', value: '2～3 小時' },
      { icon: '💰', label: '費用', value: '逛街免費，電視塔展望台 ¥900' },
      { icon: '⭐', label: '必看', value: '名古屋電視塔 · 久屋大通公園 · 松坂屋百貨' },
    ],
  },
  oasis: {
    icon: '🌀',
    name: '綠洲21',
    subtitle: 'Oasis 21, Nagoya',
    address: '〒461-0005　愛知県名古屋市東区東桜一丁目 11-1',
    mapQuery: 'オアシス21',
    desc: '綠洲21（Oasis 21）於 2002 年正式開幕，是名古屋榮商圈最具代表性的地標建築，曾獲 TripAdvisor 票選「外國遊客最佳打卡地」第二名。其最大亮點為建築師笠井秀樹設計的橢圓形玻璃屋頂「水之宇宙飛船（Spaceship Aqua）」，懸浮於地面上方 14 公尺，屋頂鋪滿淺水，陽光穿透後在樓下商場投射出美麗水波光影。建築共分三層：地面層「綠之大地」種滿花木、中層「銀河廣場」設有 30 間商店與餐廳及巴士站、上層玻璃屋頂提供環繞步道，可俯瞰名古屋電視塔與榮商圈全景。入場完全免費，夜間燈光秀從日落延續至 23:00，以十種炫彩色系輪替照亮夜空。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/f/f8/Oasis_21.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/a/aa/Oasis_21_-_Spaceship_Aqua_-_01.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/3/3b/Oasis_21_-_Sakae_Bus_Terminal_-_01.JPG',
    ],
    infos: [
      { icon: '🚇', label: '交通', value: '地下鐵「榮站」步行 1 分鐘' },
      { icon: '🕐', label: '建議停留', value: '1 小時（夜間更佳）' },
      { icon: '💰', label: '費用', value: '完全免費' },
      { icon: '🌙', label: '燈光秀', value: '日落 ～ 23:00，10 種顏色輪替' },
    ],
  },
  tvtower: {
    icon: '🗼',
    name: '名古屋電視塔',
    subtitle: 'Nagoya TV Tower, Sakae',
    address: '〒460-0003　愛知県名古屋市中区錦三丁目 6-15先',
    mapQuery: '中部電力 MIRAI TOWER',
    desc: '名古屋電視塔建於1954年，高180公尺，是日本第一座電視塔，聳立於榮的久屋大通公園中心軸線上。2019年翻新後展望台改名「MIRAI360」，以現代感設計呈現360度名古屋全景，可俯瞰整個榮商圈、遠眺名古屋城方向。白天塔身銀白挺立，入夜後以白色與金色燈光點亮，與近在咫尺的綠洲21玻璃水頂相互映照，構成榮區最具代表性的城市夜景。建議在綠洲21頂層步道抬頭看電視塔，視覺衝擊感最強。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Nagoya_TV_Tower_2010.jpg/800px-Nagoya_TV_Tower_2010.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Nagoya_TV_Tower_and_Oasis21.jpg/800px-Nagoya_TV_Tower_and_Oasis21.jpg',
    ],
    infos: [
      { icon: '🚇', label: '交通', value: '地下鐵「榮站」步行 3 分鐘' },
      { icon: '🕐', label: '建議停留', value: '30 分鐘～1 小時' },
      { icon: '💰', label: '費用', value: 'MIRAI360 展望台 ¥900（夜間推薦）' },
      { icon: '🌙', label: '夜景', value: '燈光亮起後與綠洲21相映，拍照絕佳' },
    ],
  },
  mitsui: {
    icon: '🛍️',
    name: '名古屋三井 Outlet Park',
    subtitle: 'Mitsui Outlet Park Nagoya Port',
    desc: '名古屋三井 Outlet Park（港店）緊鄰名古屋港，是名古屋規模最大的 Outlet，擁有超過 200 間品牌，涵蓋時尚服飾（Adidas、Nike、Coach、Prada 等）、生活雜貨、餐廳及甜點店。商場採開放式街廓設計，戶外走廊充滿歐式風情，天氣好的時候逛起來特別舒適。附近就是名古屋港水族館，購物前後可順道一探。平日人潮較少，週末相對擁擠，若能選平日前往購物體驗更佳。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Nagoya_Port_area.jpg/960px-Nagoya_Port_area.jpg',
    ],
    infos: [
      { icon: '🚇', label: '交通', value: '地下鐵名港線「名古屋港站」步行 5 分鐘' },
      { icon: '🕐', label: '營業時間', value: '10:00～20:00（餐廳至 21:00）' },
      { icon: '💰', label: '費用', value: '入場免費，依品牌消費' },
      { icon: '⭐', label: '推薦', value: 'Adidas · Nike · Coach · 各式餐廳' },
    ],
  },
  nagoyacastle: {
    icon: '🏯',
    name: '名古屋城',
    subtitle: 'Nagoya Castle',
    address: '〒460-0031　愛知県名古屋市中区本丸 1-1',
    mapQuery: '名古屋城',
    desc: '名古屋城建於1612年，是德川家康為第九子義直所建的居城，也是江戶時代規模最宏大的平城之一。城頂一對金色鯱鉾（金のしゃちほこ）是名古屋最具代表性的象徵，傳說可保城池不受火災侵襲。2018年完成重建的「本丸御殿」是此次參觀重點，以江戶時代御殿建築技法復原，內部障壁畫以金箔與色彩描繪動植物，金碧輝煌令人嘆為觀止。天守閣目前因耐震補強工程封閉，無法登頂。城內廣大的二之丸庭園與外苑也適合散步拍照。入場費 ¥500，16:30 最後入場，17:00 關閉。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Nagoya_Castle%28Larger%29.jpg/960px-Nagoya_Castle%28Larger%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Kinshachi_of_Nagoya_Castle.JPG/960px-Kinshachi_of_Nagoya_Castle.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Projection_Mapping_In_Honmaru-Goten_of_Nagoya_Castle_-_1.jpg/960px-Projection_Mapping_In_Honmaru-Goten_of_Nagoya_Castle_-_1.jpg',
    ],
    infos: [
      { icon: '🚇', label: '交通', value: '地下鐵名城線「市役所站」步行 5 分鐘' },
      { icon: '🕐', label: '建議停留', value: '1～1.5 小時' },
      { icon: '💰', label: '費用', value: '入場 ¥500' },
      { icon: '⚠️', label: '注意', value: '天守閣整修中無法入內；16:30 最後入場，17:00 關閉' },
    ],
  },
  osu: {
    icon: '🏮',
    name: '大須商店街',
    subtitle: 'Osu Shopping Street, Nagoya',
    address: '〒460-0011　愛知県名古屋市中区大須　（二丁目〜三丁目一帯）',
    mapQuery: '大須商店街',
    desc: '大須商店街是名古屋最有個性的商業街區，全長約1.7公里，擁有超過1,200間店鋪，融合傳統神社、二手動漫、電器行、街頭美食與個性小店，氣氛介於東京秋葉原與大阪日本橋之間，但更有在地庶民感。大須觀音（萬松寺）是商店街的精神核心，境內常年香火鼎盛。萬松寺旁的機器人表演每天定時展出，是必看的奇特景點。傍晚過後人潮湧入，唐揚雞、章魚燒、鯛魚燒等街頭小吃攤開始飄香，非常適合邊走邊吃解決晚餐。ACG 愛好者對這裡的二手動漫店和扭蛋機台難以自拔。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Osu_street_mall_-_5334482637.jpg/960px-Osu_street_mall_-_5334482637.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Osu_street_mall_-_5334484377.jpg/960px-Osu_street_mall_-_5334484377.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Japan-_Nagoya-_Osu_Kannon_Temple_2.jpg/960px-Japan-_Nagoya-_Osu_Kannon_Temple_2.jpg',
    ],
    infos: [
      { icon: '🚇', label: '交通', value: '地下鐵鶴舞線「大須觀音站」或名城線「上前津站」' },
      { icon: '🕐', label: '建議停留', value: '2～3 小時（傍晚最熱鬧）' },
      { icon: '💰', label: '費用', value: '逛街免費，餐飲自費' },
      { icon: '⭐', label: '必逛', value: '大須觀音 · 萬松寺 · 二手動漫店 · 扭蛋街' },
    ],
  },
  aeon: {
    icon: '🏬',
    name: 'AEON MALL Nagoya Noritake Garden',
    subtitle: 'AEON Mall Noritake Garden, Nagoya',
    address: '〒451-8501　愛知県名古屋市西区則武新町三丁目',
    mapQuery: 'イオンモール Nagoya Noritake Garden',
    desc: 'AEON MALL Nagoya Noritake Garden 緊鄰名古屋站西口，步行約 10 分鐘，是結合購物、餐飲與自然綠地的舒適型商場。商場一側緊鄰知名的則武（Noritake）陶瓷工廠舊址改建的「Noritake no Mori」公園，綠意盎然。館內進駐 MUJI、UNIQLO、各式餐廳及甜點咖啡廳，非常適合早午餐後輕鬆閒逛。Starbucks 面對庭園的座位區氣氛尤佳。這裡不是大型血拼型商場，而是以舒適悠閒著稱，適合旅程暖身、不耗費太多精力的上午行程。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/0/08/Entrance_of_AEON_MALL_Nagoya_Noritake_Garden_%28Noritake_Garden_side%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/9/9f/AEON_MALL_Nagoya_Noritake_Garden_-_2.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/2/23/230429_Noritake_Garden_Nagoya_Japan16s3.jpg',
    ],
    infos: [
      { icon: '🚶', label: '交通', value: '名古屋站西口步行約 10～15 分鐘' },
      { icon: '🕐', label: '營業時間', value: '10:00～21:00（餐廳至 22:00）' },
      { icon: '💰', label: '費用', value: '入場免費，消費自費' },
      { icon: '⭐', label: '推薦', value: 'Starbucks 庭園座位 · MUJI · UNIQLO · 甜點店' },
    ],
  },
  inuyama: {
    icon: '🏯',
    name: '犬山城',
    subtitle: 'Inuyama Castle, Aichi',
    address: '〒484-0082　愛知県犬山市大字犬山字北古券 65-2',
    mapQuery: '犬山城',
    desc: '犬山城建於1537年，是日本現存最古老的木造天守之一，被指定為國寶（日本僅五座國寶城堡之一）。天守聳立於木曾川旁的小丘之上，高約18公尺，登頂可360度俯瞰木曾川蜿蜒流過的壯麗景色，晴天時甚至遠眺可見御嶽山。城內保留原始木造樓梯，坡度極陡，爬上去需要手腳並用，但頂層的視野令人嘆為觀止。城堡對岸是成田山名古屋別院，搭船渡河也是特色體驗之一。春天賞櫻、秋天紅葉，犬山城四季皆美，是愛知縣最值得一訪的城堡。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/f/fd/Inuyama_Castle_Keep_Tower_20170409.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/9/9a/Castle_in_Inuyama.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/5/54/Inuyama_Castle_%28Inuyama_Aichi%29_VLux5_hdsr_24.jpg',
    ],
    infos: [
      { icon: '🚆', label: '交通', value: '名鐵犬山線「犬山站」步行約 15 分鐘' },
      { icon: '🕐', label: '建議停留', value: '1～1.5 小時' },
      { icon: '💰', label: '費用', value: '入場 ¥550' },
      { icon: '⚠️', label: '注意', value: '樓梯極陡請穿防滑鞋；16:30 最後入場，17:00 關閉' },
    ],
  },
  jokamachi: {
    icon: '🏮',
    name: '犬山城下町',
    subtitle: 'Inuyama Jokamachi Old Town',
    address: '〒484-0082　愛知県犬山市大字犬山　（本町通り一帯）',
    mapQuery: '犬山城下町 本町通り',
    desc: '犬山城下町是城堡腳下延伸出來的江戶時代古街，全長約400公尺，兩側林立著古民家改建的餐廳、甜點鋪、工藝雜貨店和土產店。街道保留了江戶時代的町屋建築風貌，石板路與格子窗構成濃厚的歷史氛圍。必吃的飛驒牛握壽司是城下町的招牌美食，肉質軟嫩鮮甜，通常一口一個即食；五平餅是傳統串烤米餅，塗上味噌醬或核桃醬烤製，香氣十足；各式抹茶甜點也是人氣選擇。下午是人潮最旺、店家最齊全的時段，建議 15:00 後悠閒漫步，是整趟犬山行程最精華的體驗。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/a/a0/Inuyama_Castle_from_Inuyama_Jokamachi_in_the_Spring.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/8/88/Inuyama_Castle_from_Inuyama_Jokamachi_in_early_Spring.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/6/6b/Inuyamajouka1.jpg',
    ],
    infos: [
      { icon: '📍', label: '位置', value: '犬山城天守下方，步行即達' },
      { icon: '🕐', label: '建議停留', value: '2～2.5 小時' },
      { icon: '💰', label: '費用', value: '逛街免費，飲食小吃自費' },
      { icon: '🍡', label: '必吃', value: '飛驒牛握壽司 · 五平餅 · 抹茶霜淇淋' },
    ],
  },
  asunal: {
    icon: '🏬',
    name: 'ASUNAL 金山',
    subtitle: 'ASUNAL Kanayama, Nagoya',
    address: '〒460-0022　愛知県名古屋市中区金山一丁目 17-18',
    mapQuery: 'アスナル金山',
    desc: 'ASUNAL金山是位於金山站北口旁的半開放式商業設施，名稱取自「明日（ASHITA）＋nal」，象徵充滿活力的明日感。商場以輕鬆的在地生活感為主軸，與榮商圈的觀光人潮不同，這裡是名古屋市民平日愛逛的休閒去處。一樓戶外廣場不定期舉辦市集與活動，晚上燈光柔和、氛圍宜人。餐廳區涵蓋居酒屋、咖啡廳、義式料理等多種選擇，適合晚餐或餐後甜點。對於想感受名古屋在地生活氣息、避開過多觀光客的旅人，金山是很好的選擇。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/ASUNAL_Kanayama20220531-1.jpg/960px-ASUNAL_Kanayama20220531-1.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/ASUNAL_Kanayama20220531-2.jpg/960px-ASUNAL_Kanayama20220531-2.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Asunal_Kanayama_%281%29%2C_Kanayama_1-chome%2C_Naka_Ward_Nagoya_City_2023.jpg/960px-Asunal_Kanayama_%281%29%2C_Kanayama_1-chome%2C_Naka_Ward_Nagoya_City_2023.jpg',
    ],
    infos: [
      { icon: '🚇', label: '交通', value: '地下鐵名城線「金山站」北口旁，大須搭車約 5 分鐘' },
      { icon: '🕐', label: '建議停留', value: '30 分鐘～1 小時' },
      { icon: '💰', label: '費用', value: '逛街免費，餐飲自費' },
      { icon: '🕘', label: '營業時間', value: '商場 ～ 21:30，餐廳多至 22:00～23:00' },
    ],
  },

  /* ── 東京 ── */
  uguisudani: {
    icon: '🏮',
    name: '鶯谷・根岸街區',
    subtitle: 'Uguisudani & Negishi, Taito',
    address: '〒110-0003　東京都台東区根岸　（鶯谷駅周辺）',
    mapQuery: '鶯谷駅',
    desc: '鶯谷站在 JR 山手線與京濱東北線上，就在上野的隔壁一站，出站後即是台東區根岸一帶。這裡幾乎沒有大型觀光設施，是很純粹的東京生活圈：低矮的住宅街、巷口的小寺院、掛著紅燈籠的居酒屋、24 小時的便利商店，以及一間間開給附近居民與上班族的小餐廳。因為緊鄰上野，交通非常方便，但走出車站兩三分鐘就完全是另一種安靜的節奏，很適合剛落地、還不想被人潮淹沒的第一晚。散步的重點不在「去哪一個點」，而是沿路看招牌、看住宅、看晚上的街道，遇到有興趣的小店就推門進去。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/JRE_Uguisudani-STA_North-Gate.jpg/960px-JRE_Uguisudani-STA_North-Gate.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/JRE_Uguisudani-STA_South-Gate.jpg/960px-JRE_Uguisudani-STA_South-Gate.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Anraku-ji_%28Negishi%2C_Taito%29_01.jpg/960px-Anraku-ji_%28Negishi%2C_Taito%29_01.jpg',
    ],
    infos: [
      { icon: '🚃', label: '交通', value: 'JR 山手線・京濱東北線「鶯谷站」；上野站 1 站約 2 分鐘' },
      { icon: '🕐', label: '建議停留', value: '30 分鐘（第一晚散步）' },
      { icon: '💰', label: '費用', value: '免費' },
      { icon: '⭐', label: '看點', value: '住宅街 · 居酒屋招牌 · 車站周邊的夜色' },
    ],
  },
  izakaya: {
    icon: '🍶',
    name: '鶯谷・根岸的居酒屋',
    subtitle: 'Izakaya around Uguisudani',
    address: '東京都台東区根岸・下谷　（鶯谷駅周辺）',
    mapQuery: '鶯谷駅 居酒屋',
    desc: '居酒屋是日本最日常的晚餐場景——不是正襟危坐的一頓飯，而是點一堆小菜慢慢吃、慢慢喝。串燒（燒鳥）、炸物（唐揚、串炸）、烤魚、玉子燒、刺身、漬物都是常見品項，份量偏小所以很適合多點幾樣分食；喝的則有生啤、Highball 與日本酒。鶯谷、根岸一帶因為是生活圈，居酒屋密度高、價位親民，而且不少店營業到 23:00 以後，第一天就算比較晚才到也不用擔心。多數店家入座後會先上一小碟「お通し」（類似座位費的小菜，約 ¥300～500），這是日本居酒屋的慣例，不是點錯餐。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Yakitori_restaurant_%28izakaya%29_in_Ota%2C_Tokyo.jpg/960px-Yakitori_restaurant_%28izakaya%29_in_Ota%2C_Tokyo.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Izakaya_Exterior_Gotanda.jpg/960px-Izakaya_Exterior_Gotanda.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Views_at_night_in_April_of_2019_around_the_Ueno_neighborhood_in_Tokyo_01.jpg/960px-Views_at_night_in_April_of_2019_around_the_Ueno_neighborhood_in_Tokyo_01.jpg',
    ],
    infos: [
      { icon: '🏪', label: '候選', value: '居酒屋 響 HIBIKI（鶯谷站步行 1 分，至 23:00）· 居酒屋 關所（站旁，週一～六至 23:30）' },
      { icon: '🕐', label: '建議停留', value: '1～1.5 小時' },
      { icon: '💰', label: '預算', value: '一人約 ¥3,000～5,000（含酒）' },
      { icon: '⚠️', label: '注意', value: '公休日與營業時間出發前再確認；小店不一定收信用卡' },
    ],
  },
  haginoyu: {
    icon: '♨️',
    name: 'ひだまりの泉 萩の湯',
    subtitle: 'Haginoyu, Negishi',
    address: '〒110-0003　東京都台東区根岸 2-13-13',
    mapQuery: 'ひだまりの泉 萩の湯 根岸',
    desc: '萩の湯是東京都內規模最大的公眾浴場（錢湯）之一，就在 JR 鶯谷站北口步行 3 分鐘、根岸的住宅區裡。它不是溫泉會館那種觀光設施，而是在地人天天會來的錢湯，但設備相當新：男女湯都有多種浴池與露天風呂，另有需加價的桑拿。營業時間分成早湯與昼夜兩段，晚上一路開到 25:00（最後受付 24:30），所以吃完晚餐、逛完街再過來完全來得及，也是把飛行一整天的疲勞洗掉最舒服的收尾。二樓有食事處「こもれび」，泡完可以再喝一杯。錢湯是日本最日常的洗澡文化，入浴前先在淋浴區把身體洗乾淨再下池是基本禮儀。',
    photos: [],
    infos: [
      { icon: '🚶', label: '交通', value: 'JR 鶯谷站北口步行 3 分鐘' },
      { icon: '🕐', label: '營業時間', value: '朝湯 6:00–9:00（最後受付 8:30）· 昼夜 11:00–25:00（最後受付 24:30）' },
      { icon: '💰', label: '入浴料', value: '約 ¥600，桑拿另計（以現場公告為準）' },
      { icon: '⚠️', label: '公休', value: '每月第三個週二' },
    ],
  },
  ameyoko: {
    icon: '🛍️',
    name: '阿美橫町',
    subtitle: 'Ameya-Yokochō, Ueno',
    address: '〒110-0005　東京都台東区上野四丁目〜六丁目',
    mapQuery: 'アメヤ横丁',
    desc: '阿美橫町（アメ橫）位於 JR 上野站與御徒町站之間的高架鐵道下方與兩側，長約 400 公尺，聚集約 400 間店鋪。它源自二戰後的黑市，名稱由來有兩種說法：一說來自當時大量販售的糖果「飴（あめ）」，一說來自美軍（American）流通的物資。現在賣的東西包羅萬象——海鮮乾貨、水果、零食、藥妝、球鞋、雜貨都有，叫賣聲此起彼落，是東京少數還留著市場氣味的街區。傍晚之後傳統商店陸續打烊，整條街的重心會換成居酒屋、立飲與小吃攤，氣氛反而更熱鬧。第一天晚上來的重點不在採買，而在感受那股東京街頭的密度。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Ameya-Yokoch%C5%8D_Entrance.jpg/960px-Ameya-Yokoch%C5%8D_Entrance.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Ameyoko_June_2022.jpg/960px-Ameyoko_June_2022.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Street_View_of_Ameya-Yokocho.jpg/960px-Street_View_of_Ameya-Yokocho.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Ueno_Ameya-Yokocho_shops_under_track_2015.jpg/960px-Ueno_Ameya-Yokocho_shops_under_track_2015.jpg',
    ],
    infos: [
      { icon: '🚃', label: '交通', value: 'JR 上野站／御徒町站步行 1～2 分鐘；鶯谷搭 1 站即達' },
      { icon: '🕐', label: '建議停留', value: '30 分鐘～1 小時' },
      { icon: '💰', label: '費用', value: '逛街免費，小吃自費' },
      { icon: '⚠️', label: '注意', value: '傳統商店約 19:00～20:00 陸續關門，晚上以居酒屋與小吃為主' },
    ],
  },

  /* 東京 Day 2–5：營業時間、票價這類會變動的資訊一律寫「出發前確認」，不填數字 */
  kawaguchiko: {
    icon: '🗻',
    name: '河口湖',
    subtitle: 'Lake Kawaguchi, Yamanashi',
    address: '山梨県南都留郡富士河口湖町　（河口湖駅周辺）',
    mapQuery: '河口湖駅',
    desc: '河口湖是富士五湖之一，也是五湖中交通最方便、周邊設施最多的一座，從東京搭高速巴士就能直達河口湖站。湖的北岸正對富士山，天氣晴朗、風小的時候，湖面會映出富士山的倒影，被稱為「逆さ富士」。河口湖也是世界文化遺產「富士山－信仰的對象與藝術的泉源」的構成資產之一。沿湖有步道、公園與咖啡廳，不需要排很多景點，慢慢沿著湖邊走、找角度拍富士山，就是最好的玩法。秋天湖畔的樹木會逐漸轉紅，景色又和夏天不同。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Mount_Fuji_from_Lake_Kawaguchi_%282015-10-26%29.jpg/960px-Mount_Fuji_from_Lake_Kawaguchi_%282015-10-26%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Kawaguchiko%2C_Part_III_-_Kawaguchiko6783.jpg/960px-Kawaguchiko%2C_Part_III_-_Kawaguchiko6783.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Mount_Fuji_from_Lake_Kawaguchi_20170206.jpg/960px-Mount_Fuji_from_Lake_Kawaguchi_20170206.jpg',
    ],
    infos: [
      { icon: '🚌', label: '交通', value: '東京站八重洲南口高速巴士直達「河口湖站」' },
      { icon: '🕐', label: '建議停留', value: '半天～一天，依天氣與體力' },
      { icon: '⭐', label: '看點', value: '富士山 · 湖面倒影 · 湖畔步道' },
      { icon: '☁️', label: '注意', value: '富士山能見度看天氣，不保證看得到' },
    ],
  },
  oishipark: {
    icon: '🌸',
    name: '大石公園',
    subtitle: 'Oishi Park, Kawaguchiko',
    address: '山梨県南都留郡富士河口湖町大石 2585',
    mapQuery: '大石公園 富士河口湖町',
    desc: '大石公園位在河口湖北岸，沿著湖邊種滿四季花卉，最有名的畫面是前景花海、中間湖面、後面富士山的構圖，是河口湖最經典的拍照點之一。夏天以薰衣草聞名，秋天則有轉成紅色的掃帚草（コキア），實際花況每年不同。園內有「河口湖自然生活館」，可以買伴手禮、吃霜淇淋、在湖邊休息。這裡沒有門票，很適合在湖邊散步途中停留，慢慢拍照。',
    photos: [],
    infos: [
      { icon: '🚌', label: '交通', value: '河口湖站搭周遊巴士可達（班次出發前確認）' },
      { icon: '🕐', label: '建議停留', value: '1 小時左右' },
      { icon: '💰', label: '費用', value: '公園免費入園' },
      { icon: '🌸', label: '看點', value: '花海 · 湖面 · 富士山同框（花況每年不同）' },
    ],
  },
  tenjoyama: {
    icon: '🚡',
    name: '河口湖～富士山全景纜車',
    subtitle: 'Mt. Fuji Panoramic Ropeway, Tenjoyama Park',
    address: '山梨県南都留郡富士河口湖町浅川 1163-1',
    mapQuery: '河口湖～富士山パノラマロープウェイ',
    desc: '從河口湖東岸搭纜車上天上山，短短幾分鐘就能到山頂的天上山公園。這座山是日本民間故事「かちかち山」的舞台，山頂到處都是兔子與狸貓的造型裝飾。山頂展望台可以一邊俯瞰河口湖、一邊正面看富士山，天氣好的時候視野非常開闊。不過纜車在假日與熱門時段常要排隊，富士山被雲遮住時上去也看不到，所以這一站適合當天看天氣和時間再決定。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Tenjosan_Park_Kachikachi-yama_Ropeway_01.JPG/960px-Tenjosan_Park_Kachikachi-yama_Ropeway_01.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Kachi_Kachi_Ropeway_%2816217350765%29.jpg/960px-Kachi_Kachi_Ropeway_%2816217350765%29.jpg',
    ],
    infos: [
      { icon: '🚶', label: '交通', value: '河口湖站步行可達（距離出發前確認）' },
      { icon: '🕐', label: '建議停留', value: '1 小時左右（不含排隊）' },
      { icon: '💰', label: '費用', value: '纜車票價出發前確認' },
      { icon: '🤔', label: '狀態', value: '備選：依天氣、排隊與剩餘時間決定' },
    ],
  },
  sensoji: {
    icon: '⛩️',
    name: '淺草寺・雷門',
    subtitle: 'Sensō-ji & Kaminarimon, Asakusa',
    address: '〒111-0032　東京都台東区浅草 2-3-1',
    mapQuery: '浅草寺',
    desc: '淺草寺相傳創建於西元 628 年，是東京最古老的寺院，供奉觀音菩薩。參拜的入口「雷門」掛著巨大的紅色燈籠，左右兩側是風神與雷神像，是東京最具代表性的拍照點之一。穿過雷門、走完仲見世通，會經過寶藏門，再往前就是本堂；旁邊還有五重塔。參拜前可以在常香爐用煙「淋」一下身體祈求健康，也可以抽籤（おみくじ）。早上人潮相對少，拍照比較從容。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Kaminarimon%2C_Sensoji_%282521999969%29.jpg/960px-Kaminarimon%2C_Sensoji_%282521999969%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Main_Hall%2C_Sensoji_20241019.jpg/960px-Main_Hall%2C_Sensoji_20241019.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Main_Hall_of_Sensoji_from_the_southwest.jpg/960px-Main_Hall_of_Sensoji_from_the_southwest.jpg',
    ],
    infos: [
      { icon: '🚇', label: '交通', value: '東京メトロ銀座線・都営浅草線「淺草站」步行即達' },
      { icon: '🕐', label: '建議停留', value: '1～1.5 小時（含仲見世通）' },
      { icon: '💰', label: '費用', value: '參拜免費' },
      { icon: '⭐', label: '必看', value: '雷門大燈籠 · 寶藏門 · 本堂 · 五重塔' },
    ],
  },
  nakamise: {
    icon: '🏮',
    name: '仲見世通',
    subtitle: 'Nakamise-dōri, Asakusa',
    address: '〒111-0032　東京都台東区浅草一丁目',
    mapQuery: '仲見世通り 浅草',
    desc: '仲見世通是從雷門一路延伸到寶藏門的參道商店街，長約 250 公尺，被認為是日本最古老的商店街之一。兩側是一間挨著一間的小店，賣人形燒、雷おこし（米香）、炸饅頭、仙貝等傳統點心，也有扇子、手拭巾、和風小物等伴手禮。邊走邊吃是這裡最好的逛法，不過參道上人潮多，習慣上會在店門口吃完再繼續走。早上店家陸續開門時人比較少。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Nakamise-D%C5%8Dri%2C_Asakusa_%289409495501%29.jpg/960px-Nakamise-D%C5%8Dri%2C_Asakusa_%289409495501%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Nakamise-Dori_%283800868893%29.jpg/960px-Nakamise-Dori_%283800868893%29.jpg',
    ],
    infos: [
      { icon: '📍', label: '位置', value: '雷門 → 寶藏門之間的參道' },
      { icon: '🕐', label: '建議停留', value: '30 分鐘～1 小時' },
      { icon: '🍡', label: '必吃', value: '人形燒 · 炸饅頭 · 仙貝 · 抹茶甜點' },
      { icon: '💡', label: '小提醒', value: '在店門口吃完再走，比較不擋路' },
    ],
  },
  skytree: {
    icon: '🗼',
    name: '東京晴空塔・Solamachi',
    subtitle: 'Tokyo Skytree & Tokyo Solamachi',
    address: '〒131-0045　東京都墨田区押上 1-1-2',
    mapQuery: '東京スカイツリー',
    desc: '東京晴空塔 2012 年開業，高 634 公尺，是世界最高的電波塔，從淺草隔著隅田川就能看到。塔上有兩層展望台，天氣好時可以遠眺整個關東平原。塔腳下的「東京 Solamachi」是大型商場，有餐廳、甜點、日本雜貨、動漫周邊與伴手禮店，不登塔也能逛上很久。這次以 Solamachi 逛街、吃午餐為主，登塔是加分項，不影響前往台場的時間才考慮。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Worm%27s-eye_view_of_Tokyo_Skytree_with_vertical_symmetry_impression%2C_a_sunny_day%2C_in_Japan.jpg/960px-Worm%27s-eye_view_of_Tokyo_Skytree_with_vertical_symmetry_impression%2C_a_sunny_day%2C_in_Japan.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Asahi_Breweries_headquarters_building_with_the_Asahi_Flame_and_Skytree_at_blue_hour_with_full_moon%2C_Sumida-ku%2C_Tokyo%2C_Japan.jpg/960px-Asahi_Breweries_headquarters_building_with_the_Asahi_Flame_and_Skytree_at_blue_hour_with_full_moon%2C_Sumida-ku%2C_Tokyo%2C_Japan.jpg',
    ],
    infos: [
      { icon: '🚃', label: '交通', value: '東武「とうきょうスカイツリー站」／「押上站」直結' },
      { icon: '🕐', label: '建議停留', value: '1.5～2 小時（午餐 ＋ 逛街）' },
      { icon: '💰', label: '費用', value: 'Solamachi 免費入場；展望台票價出發前確認' },
      { icon: '⚠️', label: '注意', value: '不預設登塔，以準時前往台場為優先' },
    ],
  },
  odaiba: {
    icon: '🌉',
    name: '台場・東京灣夜景',
    subtitle: 'Odaiba & Tokyo Bay',
    desc: '台場是東京灣上的臨海地區，隔著海可以看到彩虹大橋與東京市中心的天際線，入夜後大橋點燈，是東京最有名的夜景之一。今晚的重點是東京灣大華火祭：觀賞區、入口、入場時間與攜帶物品規定都以手上的票券和官方最新公告為準，這裡刻意不寫會場入口與路線，避免和實際安排不符。煙火大會當天人潮與交通管制都和平常不同，散場時請跟著工作人員的指示移動，預留足夠的時間回住宿。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Rainbow_Bridge_by_night_seen_from_Odaiba_side.jpg/960px-Rainbow_Bridge_by_night_seen_from_Odaiba_side.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Views_of_Rainbow_Bridge_and_Tokyo_Tower_from_Odaiba_at_night_2013-09-11.jpg/960px-Views_of_Rainbow_Bridge_and_Tokyo_Tower_from_Odaiba_at_night_2013-09-11.jpg',
    ],
    infos: [
      { icon: '🎫', label: '票券', value: '已購買，觀賞區與入口以票券為準' },
      { icon: '🎆', label: '施放時間', value: '出發前確認（以官方公告為準）' },
      { icon: '🚧', label: '交通', value: '當日交通管制與車站出入口出發前確認' },
      { icon: '🍙', label: '外食飲料', value: '是否可攜帶出發前確認' },
    ],
  },
  meiji: {
    icon: '🌳',
    name: '明治神宮',
    subtitle: 'Meiji Jingu, Shibuya',
    address: '〒151-8557　東京都渋谷区代々木神園町 1-1',
    mapQuery: '明治神宮',
    desc: '明治神宮創建於 1920 年，祭祀明治天皇與昭憲皇太后。神宮周圍約 70 公頃的森林，是當年從日本各地捐贈約十萬株樹木人工種植而成，如今已長成一片茂密的森林，走在碎石參道上幾乎聽不到外面的城市聲音。入口的大鳥居是日本最大級的木造明神鳥居之一。參拜流程很簡單：鳥居前先鞠躬、在手水舍洗手漱口、正殿前「二拜二拍手一拜」。就在原宿站旁，很適合當作一天的開始。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Meiji-jingu-pathway.jpg/960px-Meiji-jingu-pathway.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/September_2024_Meiji_Jingu_14.jpg/960px-September_2024_Meiji_Jingu_14.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/September_2024_Meiji_Jingu_2.jpg/960px-September_2024_Meiji_Jingu_2.jpg',
    ],
    infos: [
      { icon: '🚃', label: '交通', value: 'JR 山手線「原宿站」／東京メトロ「明治神宮前站」' },
      { icon: '🕐', label: '建議停留', value: '1～1.5 小時' },
      { icon: '💰', label: '費用', value: '參拜免費' },
      { icon: '⭐', label: '看點', value: '大鳥居 · 林蔭參道 · 正殿' },
    ],
  },
  takeshita: {
    icon: '🍭',
    name: '竹下通',
    subtitle: 'Takeshita Street, Harajuku',
    address: '東京都渋谷区神宮前一丁目',
    mapQuery: '竹下通り',
    desc: '竹下通就在 JR 原宿站竹下口的正對面，是一條約 350 公尺長的窄街，也是東京「卡哇伊」文化與年輕潮流的發源地。兩側擠滿平價服飾、飾品、偶像周邊、古著和雜貨小店，還有可麗餅、彩色棉花糖等原宿代表小吃。假日人潮非常多，整條街幾乎是推著走的狀態，逛的時候注意隨身物品。走到底轉個彎就是表參道，兩邊的氣氛完全不同。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Takeshita_Street_in_December_2018.jpg/960px-Takeshita_Street_in_December_2018.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Takeshita_Street_entrance_on_Meiji_Avenue_side.jpg/960px-Takeshita_Street_entrance_on_Meiji_Avenue_side.jpg',
    ],
    infos: [
      { icon: '🚃', label: '交通', value: 'JR 山手線「原宿站」竹下口正對面' },
      { icon: '🕐', label: '建議停留', value: '30 分鐘～1 小時' },
      { icon: '🍭', label: '必吃', value: '原宿可麗餅 · 街頭甜點' },
      { icon: '⚠️', label: '注意', value: '週日人潮多，留意隨身物品' },
    ],
  },
  omotesando: {
    icon: '🌳',
    name: '表參道',
    subtitle: 'Omotesandō, Shibuya / Minato',
    address: '東京都渋谷区神宮前　（表参道ヒルズ周辺）',
    mapQuery: '表参道ヒルズ',
    desc: '表參道原本是通往明治神宮的參道，如今是一條兩側種滿櫸木的寬闊林蔭大道，被稱為「東京的香榭大道」。沿路是各大精品品牌的旗艦店，許多由知名建築師設計，光是看建築就很有趣；安藤忠雄設計的「表參道 Hills」也在這條路上。巷弄裡（裏原宿、青山一帶）則藏著不少咖啡廳和甜點店，逛累了很容易找到地方坐下來休息。秋天櫸木開始轉黃，散步起來很舒服。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Omotesando_Avenue_at_sunset_from_pedestrian_bridge%2C_Jingumae%2C_Shibuya%2C_Tokyo.jpg/960px-Omotesando_Avenue_at_sunset_from_pedestrian_bridge%2C_Jingumae%2C_Shibuya%2C_Tokyo.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Omotesando_Hills_2012.JPG/960px-Omotesando_Hills_2012.JPG',
    ],
    infos: [
      { icon: '🚇', label: '交通', value: '東京メトロ「表參道站」或從原宿站步行' },
      { icon: '🕐', label: '建議停留', value: '2～3 小時（含逛店與咖啡廳）' },
      { icon: '🛍️', label: '今天要逛', value: 'CELINE · 精品旗艦店 · 咖啡廳甜點' },
      { icon: '⚠️', label: '注意', value: '店家營業時間出發前確認' },
    ],
  },
  shibuya: {
    icon: '🚥',
    name: '澀谷十字路口',
    subtitle: 'Shibuya Scramble Crossing',
    address: '東京都渋谷区道玄坂二丁目　（渋谷駅ハチ公口前）',
    mapQuery: '渋谷スクランブル交差点',
    desc: '澀谷站八公口前的全向十字路口，是世界上人流量最大的路口之一。綠燈一亮，五個方向的人潮同時湧入、交錯而過，卻很少撞在一起，這個畫面成了東京最有代表性的街景，很多電影與廣告都在這裡取景。在路口走一次是必做的體驗；想拍整個路口的全景，可以從周邊大樓的高處往下拍。八公犬銅像就在旁邊，是澀谷最有名的約見面地點。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Tokyo_Shibuya_Scramble_Crossing_2018-10-09.jpg/960px-Tokyo_Shibuya_Scramble_Crossing_2018-10-09.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Shibuya_Crossing%2C_Aerial.jpg/960px-Shibuya_Crossing%2C_Aerial.jpg',
    ],
    infos: [
      { icon: '🚃', label: '交通', value: 'JR・各線「澀谷站」八公口出站即是' },
      { icon: '🕐', label: '建議停留', value: '15～30 分鐘（拍照）' },
      { icon: '💰', label: '費用', value: '免費' },
      { icon: '⭐', label: '看點', value: '全向穿越人潮 · 八公像' },
    ],
  },
  shibuyasky: {
    icon: '🌆',
    name: 'SHIBUYA SKY',
    subtitle: 'Shibuya Scramble Square Observatory',
    address: '〒150-0002　東京都渋谷区渋谷 2-24-12　渋谷スクランブルスクエア',
    mapQuery: 'SHIBUYA SKY',
    desc: 'SHIBUYA SKY 位在 2019 年開幕的澀谷 Scramble Square 頂樓，最大特色是露天的屋頂展望空間「SKY STAGE」，四周只有玻璃圍欄，可以 360 度俯瞰澀谷十字路口、新宿高樓群和東京鐵塔，天氣好時還看得到富士山。日落前後是最熱門的時段。入場採時段制，熱門時段常常提早額滿；屋頂為了安全，帽子、包包等物品要先寄放在置物櫃，強風或下雨時屋頂區域可能暫停開放。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Shibuya_Scramble_Square_-_SHIBUYA_SKY_10.jpg/960px-Shibuya_Scramble_Square_-_SHIBUYA_SKY_10.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Shibuya_Scramble_Square_2.jpg/960px-Shibuya_Scramble_Square_2.jpg',
    ],
    infos: [
      { icon: '🚃', label: '交通', value: '澀谷站直結（澀谷 Scramble Square）' },
      { icon: '🕐', label: '建議停留', value: '約 1 小時' },
      { icon: '🎫', label: '預約時段', value: '待確認：依已預約時段調整路線' },
      { icon: '⚠️', label: '注意', value: '票價與天候開放狀況出發前確認' },
    ],
  },
  nintendo: {
    icon: '🎮',
    name: 'Nintendo TOKYO',
    subtitle: 'Nintendo TOKYO, Shibuya PARCO',
    address: '〒150-0042　東京都渋谷区宇田川町 15-1　渋谷PARCO 6F',
    mapQuery: 'Nintendo TOKYO',
    desc: 'Nintendo TOKYO 是任天堂在東京的官方直營店，2019 年隨著澀谷 PARCO 重新開幕進駐 6 樓。店裡有瑪利歐、薩爾達、寶可夢、動物森友會、斯普拉遁等系列的周邊商品，很多是官方店才買得到的限定品，門口還有大型瑪利歐等角色立像可以拍照。同一層樓也有寶可夢中心與 JUMP SHOP，喜歡遊戲與動漫的話可以一次逛完。假日人潮多，熱門時段可能需要排隊入店。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Nintendo_TOKYO_%2852505483607%29.jpg/960px-Nintendo_TOKYO_%2852505483607%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Nintendo_Tokyo_%28PXL_20231220_022539971%29.jpg/960px-Nintendo_Tokyo_%28PXL_20231220_022539971%29.jpg',
    ],
    infos: [
      { icon: '🚶', label: '交通', value: '澀谷站步行，位在澀谷 PARCO 6 樓' },
      { icon: '🕐', label: '建議停留', value: '30 分鐘～1 小時' },
      { icon: '🎮', label: '同層', value: '寶可夢中心 · JUMP SHOP' },
      { icon: '⚠️', label: '注意', value: '營業時間與排隊狀況出發前確認' },
    ],
  },
  shinjuku: {
    icon: '🌃',
    name: '新宿',
    subtitle: 'Shinjuku at Night',
    address: '東京都新宿区新宿三丁目　（新宿駅東口周辺）',
    mapQuery: '新宿駅 東口',
    desc: '新宿站是全世界乘降人數最多的車站，周圍是東京最熱鬧的商圈之一。東口一帶有伊勢丹、丸井等百貨與大量藥妝、服飾店，晚餐從拉麵、燒肉到居酒屋選擇非常多；「思い出横丁」的小巷居酒屋很有昭和氣氛。再往東走是霓虹招牌密集的歌舞伎町，而新宿二丁目則是酒吧密集、東京最有名的 LGBTQ 夜生活街區，氣氛友善開放，晚上越晚越熱鬧。逛多久完全看體力，回住宿可搭 JR 山手線。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Colorful_neon_street_signs_in_Kabukich%C5%8D%2C_Shinjuku%2C_Tokyo.jpg/960px-Colorful_neon_street_signs_in_Kabukich%C5%8D%2C_Shinjuku%2C_Tokyo.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Kabukicho-Shinjuku-Tokyo_20120204.jpg/960px-Kabukicho-Shinjuku-Tokyo_20120204.jpg',
    ],
    infos: [
      { icon: '🚃', label: '交通', value: 'JR 山手線「新宿站」' },
      { icon: '🕐', label: '建議停留', value: '依體力決定' },
      { icon: '🍜', label: '晚餐', value: '東口商圈 · 思い出横丁' },
      { icon: '🌈', label: '夜生活', value: '新宿二丁目（看體力與時間）' },
    ],
  },
  tokyotower: {
    icon: '🗼',
    name: '東京鐵塔',
    subtitle: 'Tokyo Tower, Minato',
    address: '東京都港区芝公園 4-2-8',
    mapQuery: '東京タワー',
    desc: '東京鐵塔 1958 年完工，高 333 公尺，紅白相間的塔身是東京最經典的地標之一，在晴空塔出現前一直是東京的電波塔。塔上有主展望台與更高的頂層展望台，入夜後塔身點燈，從周邊的芝公園、增上寺一帶仰望也很漂亮，不一定要上塔。這次是備選景點：如果週日晚上想加入，要先評估從澀谷／新宿過去的交通與時間，可以縮短新宿行程，或拿它替換其他夜景。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Tokyo_Tower_at_night_2.JPG/960px-Tokyo_Tower_at_night_2.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Tokyo_Tower%2C_Minato_City.jpg/960px-Tokyo_Tower%2C_Minato_City.jpg',
    ],
    infos: [
      { icon: '🚇', label: '交通', value: '都営大江戸線「赤羽橋站」／日比谷線「神谷町站」' },
      { icon: '🕐', label: '建議停留', value: '1 小時左右' },
      { icon: '💰', label: '費用', value: '展望台票價出發前確認；塔下看夜景免費' },
      { icon: '🤔', label: '狀態', value: '備選：尚未決定是否前往' },
    ],
  },
}
</script>

<style scoped>
.travel-wrap {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 3.5rem 2rem 4rem;
  animation: card-rise .5s cubic-bezier(.16,1,.3,1) both;
}

/* ── Tabs ── */
.tab-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 1.6rem;
  flex-wrap: wrap;
}
.tab-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 18px;
  border-radius: 22px;
  border: 1.5px solid var(--mg-border-soft);
  background: rgba(255,255,255,.7);
  font-family: var(--mg-font-body);
  font-size: 13px;
  font-weight: 600;
  color: var(--mg-text-body);
  cursor: pointer;
  transition: background .18s, color .18s, border-color .18s, box-shadow .18s;
}
.tab-btn:hover {
  background: rgba(74,138,88,.15);
  border-color: var(--mg-green-main);
}
.tab-btn.active {
  background: #c0392b;
  border-color: #c0392b;
  color: #fff;
  box-shadow: 0 3px 10px rgba(192,57,43,.35);
}
.tab-icon { font-size: 15px; }

/* ── Day Tabs ── */
.day-tab-bar {
  display: flex;
  gap: 6px;
  margin: 1.2rem 0 1.6rem;
  flex-wrap: wrap;
}
.day-tab-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  padding: 8px 14px;
  border-radius: 10px;
  border: 1.5px solid var(--mg-border-soft);
  background: rgba(255,255,255,.7);
  cursor: pointer;
  transition: background .18s, color .18s, border-color .18s, box-shadow .18s;
  min-width: 56px;
}
.day-tab-btn:hover {
  background: rgba(74,138,88,.15);
  border-color: var(--mg-green-main);
}
.day-tab-btn.active {
  background: #c0392b;
  border-color: #c0392b;
  box-shadow: 0 3px 10px rgba(192,57,43,.35);
}
.extra-tab {
  border-color: #7b5ea7;
  background: rgba(123,94,167,.08);
}
.extra-tab .day-tab-num { color: #7b5ea7; }
.extra-tab .day-tab-date { color: #7b5ea7; }
.extra-tab:hover {
  background: rgba(123,94,167,.18);
  border-color: #6a4d96;
}
.extra-tab.active {
  background: #7b5ea7;
  border-color: #7b5ea7;
  box-shadow: 0 3px 10px rgba(123,94,167,.35);
}
.extra-tab.active .day-tab-num { color: #fff; }
.extra-tab.active .day-tab-date { color: rgba(255,255,255,.85); }
.day-tab-num {
  font-family: var(--mg-font-body);
  font-size: 13px;
  font-weight: 800;
  color: var(--mg-text-body);
  line-height: 1;
}
.day-tab-btn.active .day-tab-num { color: #fff; }
.day-tab-date {
  font-family: var(--mg-font-body);
  font-size: 10px;
  color: var(--mg-text-muted);
  letter-spacing: .04em;
}
.day-tab-btn.active .day-tab-date { color: rgba(255,255,255,.8); }

/* ── Coming Soon ── */
.coming-soon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  text-align: center;
}
.cs-icon  { font-size: 56px; margin-bottom: 16px; opacity: .7; }
.cs-title { font-family: var(--mg-font-heading); font-size: 1.2rem; font-weight: 800; color: var(--mg-green-deep); margin-bottom: 8px; }
.cs-desc  { font-family: var(--mg-font-body); font-size: 13px; color: #999; }

/* ── Cover ── */
.cover {
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
  margin-bottom: 2rem;
  border-radius: 20px;
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 12px rgba(36,49,38,0.08), 0 1px 3px rgba(36,49,38,0.04);
}
/* 零寬度的 pseudo 撐出 16:8 的最小高度：內容比它高時整塊會自己長高，
   不會像固定 aspect-ratio 那樣在窄螢幕把標題和城市標籤裁掉 */
.cover::before {
  content: '';
  width: 0;
  padding-top: 50%;
}
.cover-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.cover-scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(20,25,20,.35) 0%, rgba(20,25,20,.15) 45%, rgba(20,25,20,.55) 100%);
}
.cover-content {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 52px 28px 44px;
}
.cover-credit {
  position: absolute;
  right: 14px;
  bottom: 10px;
  z-index: 1;
  font-family: var(--mg-font-body);
  font-size: 11px;
  letter-spacing: .04em;
  color: #fff;
  opacity: .75;
  text-shadow: 0 1px 4px rgba(0,0,0,.4);
}
.cover-sub   { font-size: 12px; letter-spacing: 4px; text-transform: uppercase; opacity: .85; margin-bottom: 10px; }
.cover-title { font-family: var(--mg-font-heading); font-size: clamp(28px, 6vw, 44px); font-weight: 900; letter-spacing: 2px; margin: 0 0 8px; }
.cover-dates { font-size: 16px; opacity: .9; margin-top: 14px; letter-spacing: 1px; }
.cover-cities { display: flex; justify-content: center; gap: 10px; margin-top: 20px; flex-wrap: wrap; }
.city-tag {
  background: rgba(255,255,255,.2);
  border: 1px solid rgba(255,255,255,.4);
  border-radius: 20px;
  padding: 5px 16px;
  font-size: 13px;
  letter-spacing: 1px;
}

/* ── Day header ── */
.day-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 2rem 0 1.2rem;
}
.day-badge {
  background: #c0392b;
  color: white;
  border-radius: 50%;
  width: 58px; height: 58px;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  font-weight: 900; flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(192,57,43,.4);
}
.badge-num   { font-family: var(--mg-font-heading); font-size: 22px; line-height: 1; }
.badge-label { font-size: 9px; letter-spacing: 1px; opacity: .85; }
.day-info h2 { font-family: var(--mg-font-heading); font-size: 1.15rem; font-weight: 800; color: #1a1a1a; margin: 0 0 2px; }
.day-weekday { font-family: var(--mg-font-body); font-size: 12px; color: #888; }

/* ── Cards ── */
.card {
  background: linear-gradient(145deg, var(--mg-bg-card), var(--mg-bg-card));
  border-radius: 20px;
  padding: 1.2rem 1.4rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 12px rgba(36,49,38,0.08), 0 1px 3px rgba(36,49,38,0.04);
  border: 1.5px solid var(--mg-border-soft);
}
.card.transport  { border-left: 5px solid #3498db; }
.card.hotel      { border-left: 5px solid #9b59b6; }
.card.food       { border-left: 5px solid #e67e22; }
.card.sightseeing{ border-left: 5px solid #27ae60; }
.card.ticket     { border-left: 5px solid #f39c12; }
.card.tip        { border-left: 5px solid #95a5a6; }

.card-header {
  display: flex; align-items: center; gap: 8px;
  margin-bottom: 12px; flex-wrap: wrap;
}
.card-icon  { font-size: 20px; }
.card-title { font-family: var(--mg-font-heading); font-size: 14px; font-weight: 700; color: var(--mg-green-deep); flex: 1; }
.card-time  { font-size: 12px; font-weight: 700; color: #888; background: rgba(0,0,0,.06); padding: 3px 10px; border-radius: 12px; white-space: nowrap; }

/* 預訂狀態：已預訂／待確認／備選 */
.status {
  font-family: var(--mg-font-body);
  font-size: 11px; font-weight: 700;
  padding: 2px 9px; border-radius: 12px;
  white-space: nowrap; border: 1px solid;
}
.status.booked   { color: #1e8449; background: rgba(39,174,96,.1);   border-color: rgba(39,174,96,.45); }
.status.pending  { color: #b9770e; background: rgba(243,156,18,.1);  border-color: rgba(243,156,18,.5); }
.status.optional { color: #7b5ea7; background: rgba(123,94,167,.1);  border-color: rgba(123,94,167,.45); }

/* ── Steps ── */
.steps { list-style: none; padding: 0; margin: 0; }
.steps li {
  display: flex; gap: 12px; padding: 7px 0;
  border-bottom: 1px dashed rgba(74,138,88,.3);
  font-family: var(--mg-font-body);
  font-size: 13px; line-height: 1.6; align-items: flex-start;
}
.steps li:last-child { border-bottom: none; }
.step-num {
  color: white;
  width: 20px; height: 20px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 700; flex-shrink: 0; margin-top: 2px;
}
.step-num.blue       { background: #3498db; }
.step-num.orange     { background: #f39c12; }
.step-num.food-color { background: #e67e22; }
.step-num.gray       { background: #95a5a6; }
.step-num.teal       { background: #1abc9c; }
.step-num.purple     { background: #9b59b6; }

/* ── Table ── */
.info-table { width: 100%; border-collapse: collapse; font-size: 13px; font-family: var(--mg-font-body); }
.info-table th { background: rgba(0,0,0,.04); padding: 7px 10px; text-align: left; font-size: 11px; color: #666; border-bottom: 2px solid rgba(74,138,88,.3); }
.info-table td { padding: 8px 10px; border-bottom: 1px solid rgba(74,138,88,.18); }
.info-table tr:last-child td { border-bottom: none; }
.price { font-weight: 700; color: #c0392b; text-align: right; }

/* ── Alert ── */
.alert {
  background: rgba(243,156,18,.08);
  border: 1px solid rgba(243,156,18,.4);
  border-radius: 6px;
  padding: 10px 14px;
  font-family: var(--mg-font-body);
  font-size: 13px;
  display: flex; gap: 8px; align-items: flex-start;
  margin-top: 10px;
}
.alert-icon { font-size: 16px; flex-shrink: 0; }
/* 整天最重要、不能錯過的提醒（例：煙火日） */
.alert-key {
  background: rgba(192,57,43,.08);
  border: 1.5px solid rgba(192,57,43,.55);
  color: #922b21;
  padding: 12px 16px;
  margin: 0 0 1rem;
}

/* ── Hotel ── */
.hotel-name { font-size: 15px; font-weight: 800; color: #9b59b6; margin-bottom: 2px; font-family: var(--mg-font-body); }
.hotel-name-sub { font-size: 11px; color: #b07bd0; font-family: var(--mg-font-body); margin-bottom: 8px; letter-spacing: .04em; }
.address-box {
  background: rgba(155,89,182,.06);
  border-radius: 8px; padding: 10px 14px;
  font-size: 12px; display: flex; flex-direction: column; gap: 3px;
}
.addr-label { font-size: 10px; color: #9b59b6; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; display: flex; align-items: center; gap: 6px; }
.addr-text  { font-weight: 600; color: #2c2c2c; font-family: var(--mg-font-body); font-size: 13px; }
.addr-dist  { font-size: 11px; color: #888; font-family: var(--mg-font-body); }
.map-hint   { font-size: 10px; color: #9b59b6; font-weight: 400; letter-spacing: 0; text-transform: none; opacity: .8; }
.address-link {
  text-decoration: none;
  display: flex; flex-direction: column; gap: 3px;
  transition: background .2s, border-color .2s;
}
.address-link:hover {
  background: rgba(155,89,182,.12);
  border-color: #9b59b6;
}
/* 景點 Modal 裡的地址：沿用飯店那組結構，換成 modal 的綠色系 */
.modal-address {
  margin-bottom: 1.2rem;
  background: var(--mg-bg-green-soft);
}
.modal-address:hover { background: var(--mg-green-pale); }
.modal-address .addr-label,
.modal-address .map-hint { color: var(--mg-green-main); }
.modal-address .addr-text { color: var(--mg-green-deep); line-height: 1.5; }

/* ── Spots ── */
.spot-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px; }
.spot-item {
  background: rgba(255,255,255,.5);
  border-radius: 8px; padding: 12px 14px;
  border: 1px solid rgba(74,138,88,.3);
  transition: transform .15s, box-shadow .15s, border-color .15s;
}
.spot-item.clickable {
  cursor: pointer;
}
.spot-item.clickable:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0,0,0,.1);
  border-color: #27ae60;
}
.spot-icon  { font-size: 22px; margin-bottom: 5px; }
.spot-name  { font-weight: 700; font-size: 14px; font-family: var(--mg-font-body); color: var(--mg-green-deep); }
.spot-arrow { color: #27ae60; font-size: 16px; margin-left: 2px; }
.spot-desc  { font-size: 12px; color: #777; margin-top: 4px; line-height: 1.55; font-family: var(--mg-font-body); }

/* ── Food list ── */
.food-shop + .food-shop {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px dashed rgba(74,138,88,.3);
}
.food-shop-head { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.food-name    { font-family: var(--mg-font-body); font-size: 15px; font-weight: 800; color: var(--mg-green-deep); }
.food-cuisine { font-family: var(--mg-font-body); font-size: 12px; color: #777; margin-top: 3px; }
.food-photo { margin: 10px 0 0; }
.food-photo img {
  width: 100%; height: 200px;
  object-fit: cover; display: block;
  border-radius: 12px;
  border: 1.5px solid var(--mg-border-soft);
  background: #d4eada;
}
.food-photo figcaption {
  font-family: var(--mg-font-body);
  font-size: 10px; color: var(--mg-text-muted);
  margin-top: 4px; letter-spacing: .02em;
}

/* ── More / Footer ── */
.more-hint {
  text-align: center; color: var(--mg-text-muted);
  font-family: var(--mg-font-body);
  font-style: italic; font-size: 13px; padding: 24px 0 8px;
}
.travel-footer {
  text-align: center; padding: 20px;
  font-family: var(--mg-font-body);
  font-size: 13px; color: var(--mg-text-muted); letter-spacing: 1px;
}

/* ── Modal ── */
.modal-overlay {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(10,6,2,.6);
  display: flex; align-items: center; justify-content: center;
  padding: 1rem;
  backdrop-filter: blur(3px);
}
.modal-box {
  background: linear-gradient(160deg, var(--mg-bg-card), var(--mg-bg-card));
  border: 2px solid var(--mg-border-soft);
  border-radius: 20px;
  box-shadow: 0 6px 24px rgba(36,49,38,0.13), 0 2px 6px rgba(36,49,38,0.07);
  width: 100%; max-width: 560px;
  max-height: 88vh;
  overflow-y: auto;
  padding: 1.6rem 1.6rem 1.4rem;
  position: relative;
}
.modal-close {
  position: absolute; top: 1rem; right: 1rem;
  background: transparent; border: none;
  font-size: 1.1rem; color: var(--mg-text-muted); cursor: pointer;
  line-height: 1; padding: 4px 6px;
  transition: color .2s;
}
.modal-close:hover { color: var(--mg-green-deep); }

.modal-header {
  display: flex; align-items: center; gap: 14px;
  margin-bottom: 1.2rem; padding-right: 2rem;
}
.modal-icon    { font-size: 36px; }
.modal-title   { font-family: var(--mg-font-heading); font-size: 1.3rem; font-weight: 800; color: var(--mg-green-deep); }
.modal-subtitle{ font-family: var(--mg-font-body); font-size: 0.75rem; letter-spacing: .12em; color: var(--mg-text-muted); margin-top: 2px; }

/* ── Photo gallery ── */
.photo-gallery { margin-bottom: 1.2rem; }
.photo-main {
  width: 100%; height: 220px;
  border-radius: 20px; overflow: hidden;
  background: #d4eada;
  border: 1.5px solid var(--mg-border-soft);
  margin-bottom: 8px;
}
.photo-main img {
  width: 100%; height: 100%;
  object-fit: cover;
  display: block;
  transition: opacity .3s;
}
.photo-thumbs {
  display: flex; gap: 6px;
}
.photo-thumbs img {
  width: 72px; height: 52px;
  object-fit: cover;
  border-radius: 3px;
  border: 2px solid transparent;
  cursor: pointer;
  opacity: .65;
  transition: opacity .2s, border-color .2s;
}
.photo-thumbs img.active,
.photo-thumbs img:hover {
  opacity: 1;
  border-color: var(--mg-green-main);
}

/* ── Modal desc ── */
.modal-desc {
  font-family: var(--mg-font-body);
  font-size: 13px; line-height: 1.85; color: var(--mg-text-body);
  margin-bottom: 1.2rem;
}

/* ── Info chips ── */
.modal-info-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
}
.info-chip {
  background: rgba(255,255,255,.55);
  border: 1px solid rgba(74,138,88,.3);
  border-radius: 8px;
  padding: 10px 12px;
  display: flex; gap: 10px; align-items: flex-start;
}
.info-chip-icon  { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
.info-chip-label { font-family: var(--mg-font-body); font-size: 9px; letter-spacing: .12em; color: var(--mg-text-muted); text-transform: uppercase; margin-bottom: 2px; }
.info-chip-value { font-family: var(--mg-font-body); font-size: 12px; color: var(--mg-green-deep); font-weight: 600; line-height: 1.4; }

/* ── Transition ── */
.modal-enter-active, .modal-leave-active { transition: opacity .2s, transform .2s; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .modal-box { transform: scale(.96) translateY(8px); }
.modal-leave-to   .modal-box { transform: scale(.96) translateY(8px); }

@media (max-width: 600px) {
  .cover          { min-height: 200px; border-radius: 16px; }
  .cover-content  { padding: 34px 16px 36px; }
  .cover-sub      { font-size: 11px; letter-spacing: 2.5px; margin-bottom: 8px; }
  .cover-dates    { font-size: 13px; margin-top: 10px; letter-spacing: .5px; }
  .cover-cities   { gap: 6px; margin-top: 14px; }
  .city-tag       { font-size: 11px; padding: 4px 12px; letter-spacing: .5px; }
  .cover-credit   { font-size: 10px; right: 10px; bottom: 8px; }
}

@media (max-width: 480px) {
  .travel-wrap    { padding: 3rem 1rem 3rem; }
  .spot-grid      { grid-template-columns: 1fr; }
  .modal-info-grid{ grid-template-columns: 1fr; }
  .photo-main     { height: 180px; }
  .photo-thumbs img { width: 56px; height: 42px; }
}
</style>
