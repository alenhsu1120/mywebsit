<template>
  <div class="travel-wrap">

    <RouterLink to="/" class="back-link">‹ 返回</RouterLink>

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
      <div class="cover-sub">Travel Guide 2026</div>
      <h1 class="cover-title">日本旅遊手冊</h1>
      <div class="cover-dates">2026 年 6 月 18 日出發</div>
      <div class="cover-cities">
        <span class="city-tag">✈ 關西機場</span>
        <span class="city-tag">🚄 新大阪</span>
        <span class="city-tag">🏯 名古屋</span>
      </div>
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

    <!-- 熱田神宮 -->
    <div class="card sightseeing">
      <div class="card-header">
        <span class="card-icon">⛩️</span>
        <span class="card-title">熱田神宮</span>
        <span class="card-time">14:00～15:30</span>
      </div>
      <div class="spot-grid">
        <div class="spot-item clickable" @click="openSpot('atsuta')">
          <div class="spot-icon">⛩️</div>
          <div class="spot-name">熱田神宮 <span class="spot-arrow">›</span></div>
          <div class="spot-desc">全日本第三大神宮，供奉草薙神劍，境內廣大幽靜，是名古屋最具歷史分量的必訪聖地。</div>
        </div>
      </div>
      <ul class="steps" style="margin-top:12px">
        <li><span class="step-num teal">●</span><span><strong>本宮</strong>　正殿參拜，感受莊嚴氣息</span></li>
        <li><span class="step-num teal">●</span><span><strong>清水社</strong>　據說用清水洗臉可變美，值得一訪</span></li>
        <li><span class="step-num teal">●</span><span><strong>信長塀</strong>　織田信長奉納的土牆，歷史名物</span></li>
        <li><span class="step-num teal">●</span><span><strong>草薙館</strong>（有興趣再進）　寶物殿，需另付費</span></li>
      </ul>
      <div class="alert">
        <span class="alert-icon">💡</span>
        <span>境內很大，走一圈約 1～1.5 小時。神社類景點白天氛圍最佳，建議準時 14:00 出發。</span>
      </div>
    </div>

    <!-- 交通 熱田→名古屋城 -->
    <div class="card transport">
      <div class="card-header">
        <span class="card-icon">🚇</span>
        <span class="card-title">熱田神宮 → 名古屋城</span>
        <span class="card-time">15:30 出發</span>
      </div>
      <ul class="steps">
        <li><span class="step-num blue">1</span><span>從<strong>神宮西站</strong>搭地鐵名城線</span></li>
        <li><span class="step-num blue">2</span><span>在<strong>市役所站</strong>下車，步行約 5 分鐘即達名古屋城</span></li>
        <li><span class="step-num blue">3</span><span>車程約 <strong>20 分鐘</strong>，約 15:45 抵達</span></li>
      </ul>
    </div>

    <!-- 名古屋城 -->
    <div class="card sightseeing">
      <div class="card-header">
        <span class="card-icon">🏯</span>
        <span class="card-title">名古屋城</span>
        <span class="card-time">15:45～17:15</span>
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
        <span class="card-time">17:15 出發</span>
      </div>
      <ul class="steps">
        <li><span class="step-num blue">1</span><span>從<strong>市役所站</strong>搭地鐵名城線</span></li>
        <li><span class="step-num blue">2</span><span>在<strong>上前津站</strong>下車，步行約 5 分鐘進入商店街</span></li>
        <li><span class="step-num blue">3</span><span>車程約 <strong>15 分鐘</strong>，約 17:45 抵達</span></li>
      </ul>
    </div>

    <!-- 大須商店街 + 晚餐 -->
    <div class="card sightseeing">
      <div class="card-header">
        <span class="card-icon">🛍</span>
        <span class="card-title">大須商店街 ＋ 晚餐</span>
        <span class="card-time">17:45～20:30</span>
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

    <!-- ASUNAL 金山 -->
    <div class="card tip">
      <div class="card-header">
        <span class="card-icon">✨</span>
        <span class="card-title">有空加碼　ASUNAL 金山</span>
        <span class="card-time">20:30～21:30</span>
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

    <!-- 時間軸總覽 -->
    <div class="card tip">
      <div class="card-header">
        <span class="card-icon">🗓</span>
        <span class="card-title">第二天時間軸總覽</span>
      </div>
      <table class="info-table">
        <thead><tr><th>時間</th><th>行程</th></tr></thead>
        <tbody>
          <tr><td><strong>14:00</strong></td><td>⛩️ 熱田神宮</td></tr>
          <tr><td><strong>15:30</strong></td><td>離開熱田神宮，搭地鐵前往名古屋城</td></tr>
          <tr><td><strong>15:45～17:15</strong></td><td>🏯 名古屋城（本丸御殿、城牆、金鯱）</td></tr>
          <tr><td><strong>17:45～20:30</strong></td><td>🛍 大須商店街 ＋ 晚餐</td></tr>
          <tr><td><strong>20:30～21:30</strong></td><td>✨ ASUNAL 金山（有空再去）</td></tr>
        </tbody>
      </table>
    </div>

    <div class="more-hint">✦ &nbsp; 路線：熱田神宮 → 名古屋城 → 大須商店街 → ASUNAL 金山 &nbsp; ✦</div>

    <footer class="travel-footer">
      🇯🇵 Japan Trip 2026 &nbsp;｜&nbsp; Have a great journey!
    </footer>

    </div><!-- end day 2 -->

    <!-- 第三天 -->
    <div v-if="activeDay === 3">
      <div class="coming-soon">
        <div class="cs-icon">⛩️</div>
        <div class="cs-title">第三天行程規劃中</div>
        <div class="cs-desc">2026 年 6 月 20 日（六）｜內容即將更新，敬請期待。</div>
      </div>
    </div>

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

    <!-- 早餐 -->
    <div class="card food">
      <div class="card-header">
        <span class="card-icon">🍱</span>
        <span class="card-title">早餐</span>
        <span class="card-time">08:00～09:00</span>
      </div>
      <ul class="steps">
        <li><span class="step-num food-color">●</span><span>在飯店附近找早餐，或前往附近便利商店（7-Eleven、Family Mart）簡單解決，省時方便。</span></li>
      </ul>
    </div>

    <!-- 退房 -->
    <div class="card hotel">
      <div class="card-header">
        <span class="card-icon">🏨</span>
        <span class="card-title">整理行李 ＆ 退房</span>
        <span class="card-time">09:00 整理 ／ 09:30 退房</span>
      </div>
      <div class="hotel-name">名古屋日航尚格酒店</div>
      <div class="alert" style="margin-top:10px">
        <span class="alert-icon">💡</span>
        <span>退房後步行或搭計程車（約 6 分鐘）前往名古屋站，準備搭新幹線出發。</span>
      </div>
    </div>

    <!-- 名古屋最後散步 -->
    <div class="card sightseeing">
      <div class="card-header">
        <span class="card-icon">🚶</span>
        <span class="card-title">名古屋最後散步</span>
        <span class="card-time">散步午餐</span>
      </div>
      <div class="spot-grid">
        <div class="spot-item">
          <div class="spot-icon">🏙</div>
          <div class="spot-name">選項 A：名古屋站周邊</div>
          <div class="spot-desc">JR Central Towers ／ Midland Square，可上高樓層欣賞名古屋市景，最後一瞥城市全貌。</div>
        </div>
        <div class="spot-item">
          <div class="spot-icon">🐟</div>
          <div class="spot-name">選項 B：柳橋中央市場</div>
          <div class="spot-desc">距離飯店不遠的老市場，適合吃海鮮丼、壽司、烤魚定食，當作最後一頓名古屋美食。</div>
        </div>
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

    </div><!-- end nagoya -->

    <!-- 香港 -->
    <div v-if="activeTab === 'hongkong'">
      <div class="cover" style="background: linear-gradient(160deg, #c0392b 0%, #e74c3c 50%, #ff6b35 100%);">
        <div class="cover-sub">Travel Guide</div>
        <h1 class="cover-title">香港旅遊手冊</h1>
        <div class="cover-dates">敬請期待</div>
        <div class="cover-cities">
          <span class="city-tag">✈ 香港國際機場</span>
          <span class="city-tag">🌆 維多利亞港</span>
          <span class="city-tag">🏙 九龍</span>
        </div>
      </div>
      <div class="coming-soon">
        <div class="cs-icon">🏮</div>
        <div class="cs-title">香港行程規劃中</div>
        <div class="cs-desc">內容即將更新，敬請期待。</div>
      </div>
    </div>

    <!-- 東京 -->
    <div v-if="activeTab === 'tokyo'">
      <div class="cover" style="background: linear-gradient(160deg, #2c3e50 0%, #3498db 50%, #9b59b6 100%);">
        <div class="cover-sub">Travel Guide</div>
        <h1 class="cover-title">東京旅遊手冊</h1>
        <div class="cover-dates">敬請期待</div>
        <div class="cover-cities">
          <span class="city-tag">✈ 成田機場</span>
          <span class="city-tag">🗼 東京鐵塔</span>
          <span class="city-tag">🌸 淺草</span>
        </div>
      </div>
      <div class="coming-soon">
        <div class="cs-icon">🗼</div>
        <div class="cs-title">東京行程規劃中</div>
        <div class="cs-desc">內容即將更新，敬請期待。</div>
      </div>
    </div>

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
          <div class="photo-gallery">
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
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

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

type SpotKey = 'sakae' | 'oasis' | 'tvtower' | 'atsuta' | 'nagoyacastle' | 'osu' | 'asunal'

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

const spots: Record<SpotKey, {
  icon: string
  name: string
  subtitle: string
  desc: string
  photos: string[]
  infos: { icon: string; label: string; value: string }[]
}> = {
  sakae: {
    icon: '🛍',
    name: '榮商圈',
    subtitle: 'Sakae, Nagoya',
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
  atsuta: {
    icon: '⛩️',
    name: '熱田神宮',
    subtitle: 'Atsuta Jingu, Nagoya',
    desc: '熱田神宮創建於西元113年，是全日本第三大神宮，僅次於伊勢神宮與出雲大社。神宮供奉「草薙神劍」——日本三大神器之一，相傳為日本武尊東征時所用的神劍。境內廣達19萬坪，古木參天、苔痕遍地，氣氛莊嚴靜謐，甚至有名古屋人稱這裡是「都市中的森林」。信長塀是織田信長1560年桶狹間合戰大勝後奉納的土牆，全長64公尺，是日本三大土牆之一。清水社旁的小水池據說用清水洗臉可保佑美容，頗受女性遊客喜愛。每年初詣參拜人數超過230萬，是愛知縣最重要的信仰中心。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Atsuta_Jingu_01.jpg/800px-Atsuta_Jingu_01.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Atsuta_Jingu_Honden.jpg/800px-Atsuta_Jingu_Honden.jpg',
    ],
    infos: [
      { icon: '🚇', label: '交通', value: '地下鐵名城線「神宮西站」步行 3 分鐘' },
      { icon: '🕐', label: '建議停留', value: '1～1.5 小時' },
      { icon: '💰', label: '費用', value: '境內免費（草薙館 ¥300）' },
      { icon: '⭐', label: '必看', value: '本宮 · 信長塀 · 清水社' },
    ],
  },
  nagoyacastle: {
    icon: '🏯',
    name: '名古屋城',
    subtitle: 'Nagoya Castle',
    desc: '名古屋城建於1612年，是德川家康為第九子義直所建的居城，也是江戶時代規模最宏大的平城之一。城頂一對金色鯱鉾（金のしゃちほこ）是名古屋最具代表性的象徵，傳說可保城池不受火災侵襲。2018年完成重建的「本丸御殿」是此次參觀重點，以江戶時代御殿建築技法復原，內部障壁畫以金箔與色彩描繪動植物，金碧輝煌令人嘆為觀止。天守閣目前因耐震補強工程封閉，無法登頂。城內廣大的二之丸庭園與外苑也適合散步拍照。入場費 ¥500，16:30 最後入場，17:00 關閉。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Nagoya_castle_2010.jpg/800px-Nagoya_castle_2010.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Nagoya_Castle_Honmaru_Goten_Interior.jpg/800px-Nagoya_Castle_Honmaru_Goten_Interior.jpg',
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
    desc: '大須商店街是名古屋最有個性的商業街區，全長約1.7公里，擁有超過1,200間店鋪，融合傳統神社、二手動漫、電器行、街頭美食與個性小店，氣氛介於東京秋葉原與大阪日本橋之間，但更有在地庶民感。大須觀音（萬松寺）是商店街的精神核心，境內常年香火鼎盛。萬松寺旁的機器人表演每天定時展出，是必看的奇特景點。傍晚過後人潮湧入，唐揚雞、章魚燒、鯛魚燒等街頭小吃攤開始飄香，非常適合邊走邊吃解決晚餐。ACG 愛好者對這裡的二手動漫店和扭蛋機台難以自拔。',
    photos: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Osu_Kannon_Nagoya.jpg/800px-Osu_Kannon_Nagoya.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Osu_shopping_street.jpg/800px-Osu_shopping_street.jpg',
    ],
    infos: [
      { icon: '🚇', label: '交通', value: '地下鐵鶴舞線「大須觀音站」或名城線「上前津站」' },
      { icon: '🕐', label: '建議停留', value: '2～3 小時（傍晚最熱鬧）' },
      { icon: '💰', label: '費用', value: '逛街免費，餐飲自費' },
      { icon: '⭐', label: '必逛', value: '大須觀音 · 萬松寺 · 二手動漫店 · 扭蛋街' },
    ],
  },
  asunal: {
    icon: '🏬',
    name: 'ASUNAL 金山',
    subtitle: 'ASUNAL Kanayama, Nagoya',
    desc: 'ASUNAL金山是位於金山站北口旁的半開放式商業設施，名稱取自「明日（ASHITA）＋nal」，象徵充滿活力的明日感。商場以輕鬆的在地生活感為主軸，與榮商圈的觀光人潮不同，這裡是名古屋市民平日愛逛的休閒去處。一樓戶外廣場不定期舉辦市集與活動，晚上燈光柔和、氛圍宜人。餐廳區涵蓋居酒屋、咖啡廳、義式料理等多種選擇，適合晚餐或餐後甜點。對於想感受名古屋在地生活氣息、避開過多觀光客的旅人，金山是很好的選擇。',
    photos: [],
    infos: [
      { icon: '🚇', label: '交通', value: '地下鐵名城線「金山站」北口旁，大須搭車約 5 分鐘' },
      { icon: '🕐', label: '建議停留', value: '30 分鐘～1 小時' },
      { icon: '💰', label: '費用', value: '逛街免費，餐飲自費' },
      { icon: '🕘', label: '營業時間', value: '商場 ～ 21:30，餐廳多至 22:00～23:00' },
    ],
  },
}
</script>

<style scoped>
.travel-wrap {
  width: 100%;
  max-width: 720px;
  padding: 0 2rem 4rem;
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
  border: 1.5px solid #d4b870;
  background: rgba(250,245,232,.7);
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #7a5c20;
  cursor: pointer;
  transition: background .18s, color .18s, border-color .18s, box-shadow .18s;
}
.tab-btn:hover {
  background: rgba(212,184,112,.3);
  border-color: #b8963e;
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
  border: 1.5px solid #d4b870;
  background: rgba(250,245,232,.7);
  cursor: pointer;
  transition: background .18s, color .18s, border-color .18s, box-shadow .18s;
  min-width: 56px;
}
.day-tab-btn:hover {
  background: rgba(212,184,112,.3);
  border-color: #b8963e;
}
.day-tab-btn.active {
  background: #c0392b;
  border-color: #c0392b;
  box-shadow: 0 3px 10px rgba(192,57,43,.35);
}
.day-tab-num {
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  font-weight: 800;
  color: #7a5c20;
  line-height: 1;
}
.day-tab-btn.active .day-tab-num { color: #fff; }
.day-tab-date {
  font-family: 'Poppins', sans-serif;
  font-size: 10px;
  color: #a07840;
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
.cs-title { font-family: 'Poppins', 'Noto Sans TC', sans-serif; font-size: 1.2rem; font-weight: 800; color: #2c1e08; margin-bottom: 8px; }
.cs-desc  { font-family: 'Poppins', 'Noto Sans TC', sans-serif; font-size: 13px; color: #999; }

/* ── Back ── */
.back-link {
  display: inline-block;
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: .75rem;
  letter-spacing: .15em;
  color: #6a5030;
  text-decoration: none;
  padding: .3rem 0;
  margin-bottom: 1.4rem;
  opacity: .75;
  transition: opacity .2s, color .2s;
  text-shadow: 0 1px 3px rgba(255,255,255,.7);
}
.back-link:hover { opacity: 1; color: #3d2810; }

/* ── Cover ── */
.cover {
  background: linear-gradient(160deg, #c0392b 0%, #e74c3c 40%, #f39c12 100%);
  color: white;
  text-align: center;
  padding: 52px 28px 44px;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  margin-bottom: 2rem;
  box-shadow: 3px 3px 0 rgba(0,0,0,.15);
}
.cover::before {
  content: '⛩';
  font-size: 110px;
  position: absolute;
  top: -10px; right: -5px;
  opacity: .12;
  pointer-events: none;
}
.cover-sub   { font-size: 12px; letter-spacing: 4px; text-transform: uppercase; opacity: .85; margin-bottom: 10px; }
.cover-title { font-size: clamp(28px, 6vw, 44px); font-weight: 900; letter-spacing: 2px; margin: 0 0 8px; }
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
.badge-num   { font-size: 22px; line-height: 1; }
.badge-label { font-size: 9px; letter-spacing: 1px; opacity: .85; }
.day-info h2 { font-family: 'Poppins', 'Noto Sans TC', sans-serif; font-size: 1.15rem; font-weight: 800; color: #1a1a1a; margin: 0 0 2px; }
.day-weekday { font-family: 'Poppins', 'Noto Sans TC', sans-serif; font-size: 12px; color: #888; }

/* ── Cards ── */
.card {
  background: linear-gradient(145deg, #faf5e8, #f2ead4);
  border-radius: 2px;
  padding: 1.2rem 1.4rem;
  margin-bottom: 1rem;
  box-shadow: 3px 3px 0 #8a6e10, inset 0 1px 0 rgba(255,255,255,.8);
  border: 1.5px solid #d4b870;
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
.card-title { font-family: 'Poppins', 'Noto Sans TC', sans-serif; font-size: 14px; font-weight: 700; color: #2c1e08; flex: 1; }
.card-time  { font-size: 12px; font-weight: 700; color: #888; background: rgba(0,0,0,.06); padding: 3px 10px; border-radius: 12px; white-space: nowrap; }

/* ── Steps ── */
.steps { list-style: none; padding: 0; margin: 0; }
.steps li {
  display: flex; gap: 12px; padding: 7px 0;
  border-bottom: 1px dashed rgba(212,184,112,.5);
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
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
.info-table { width: 100%; border-collapse: collapse; font-size: 13px; font-family: 'Poppins', 'Noto Sans TC', sans-serif; }
.info-table th { background: rgba(0,0,0,.04); padding: 7px 10px; text-align: left; font-size: 11px; color: #666; border-bottom: 2px solid rgba(212,184,112,.4); }
.info-table td { padding: 8px 10px; border-bottom: 1px solid rgba(212,184,112,.25); }
.info-table tr:last-child td { border-bottom: none; }
.price { font-weight: 700; color: #c0392b; text-align: right; }

/* ── Alert ── */
.alert {
  background: rgba(243,156,18,.08);
  border: 1px solid rgba(243,156,18,.4);
  border-radius: 6px;
  padding: 10px 14px;
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: 13px;
  display: flex; gap: 8px; align-items: flex-start;
  margin-top: 10px;
}
.alert-icon { font-size: 16px; flex-shrink: 0; }

/* ── Hotel ── */
.hotel-name { font-size: 15px; font-weight: 800; color: #9b59b6; margin-bottom: 2px; font-family: 'Poppins', 'Noto Sans TC', sans-serif; }
.hotel-name-sub { font-size: 11px; color: #b07bd0; font-family: 'Noto Sans TC', sans-serif; margin-bottom: 8px; letter-spacing: .04em; }
.address-box {
  background: rgba(155,89,182,.06);
  border-radius: 8px; padding: 10px 14px;
  font-size: 12px; display: flex; flex-direction: column; gap: 3px;
}
.addr-label { font-size: 10px; color: #9b59b6; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; display: flex; align-items: center; gap: 6px; }
.addr-text  { font-weight: 600; color: #2c2c2c; font-family: 'Poppins', 'Noto Sans TC', sans-serif; font-size: 13px; }
.addr-dist  { font-size: 11px; color: #888; font-family: 'Poppins', 'Noto Sans TC', sans-serif; }
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

/* ── Spots ── */
.spot-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 10px; }
.spot-item {
  background: rgba(255,255,255,.5);
  border-radius: 8px; padding: 12px 14px;
  border: 1px solid rgba(212,184,112,.4);
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
.spot-name  { font-weight: 700; font-size: 14px; font-family: 'Poppins', 'Noto Sans TC', sans-serif; color: #2c1e08; }
.spot-arrow { color: #27ae60; font-size: 16px; margin-left: 2px; }
.spot-desc  { font-size: 12px; color: #777; margin-top: 4px; line-height: 1.55; font-family: 'Poppins', 'Noto Sans TC', sans-serif; }

/* ── More / Footer ── */
.more-hint {
  text-align: center; color: #b0906a;
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-style: italic; font-size: 13px; padding: 24px 0 8px;
}
.travel-footer {
  text-align: center; padding: 20px;
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: 13px; color: #a08848; letter-spacing: 1px;
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
  background: linear-gradient(160deg, #fdf8ec, #f5ead0);
  border: 2px solid #c9a227;
  border-radius: 4px;
  box-shadow: 6px 6px 0 #8a6e10, inset 0 1px 0 rgba(255,255,255,.85);
  width: 100%; max-width: 560px;
  max-height: 88vh;
  overflow-y: auto;
  padding: 1.6rem 1.6rem 1.4rem;
  position: relative;
}
.modal-close {
  position: absolute; top: 1rem; right: 1rem;
  background: transparent; border: none;
  font-size: 1.1rem; color: #9a7a3a; cursor: pointer;
  line-height: 1; padding: 4px 6px;
  transition: color .2s;
}
.modal-close:hover { color: #3d2810; }

.modal-header {
  display: flex; align-items: center; gap: 14px;
  margin-bottom: 1.2rem; padding-right: 2rem;
}
.modal-icon    { font-size: 36px; }
.modal-title   { font-family: 'Poppins', 'Noto Sans TC', sans-serif; font-size: 1.3rem; font-weight: 800; color: #2c1e08; }
.modal-subtitle{ font-family: 'Poppins', sans-serif; font-size: 0.75rem; letter-spacing: .12em; color: #9a7a3a; margin-top: 2px; }

/* ── Photo gallery ── */
.photo-gallery { margin-bottom: 1.2rem; }
.photo-main {
  width: 100%; height: 220px;
  border-radius: 4px; overflow: hidden;
  background: #e8d8b0;
  border: 1.5px solid #d4b870;
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
  border-color: #c9a227;
}

/* ── Modal desc ── */
.modal-desc {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: 13px; line-height: 1.85; color: #3a2a10;
  margin-bottom: 1.2rem;
}

/* ── Info chips ── */
.modal-info-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 8px;
}
.info-chip {
  background: rgba(255,255,255,.55);
  border: 1px solid rgba(212,184,112,.5);
  border-radius: 8px;
  padding: 10px 12px;
  display: flex; gap: 10px; align-items: flex-start;
}
.info-chip-icon  { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
.info-chip-label { font-family: 'Poppins', sans-serif; font-size: 9px; letter-spacing: .12em; color: #9a7a3a; text-transform: uppercase; margin-bottom: 2px; }
.info-chip-value { font-family: 'Poppins', 'Noto Sans TC', sans-serif; font-size: 12px; color: #2c1e08; font-weight: 600; line-height: 1.4; }

/* ── Transition ── */
.modal-enter-active, .modal-leave-active { transition: opacity .2s, transform .2s; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .modal-box { transform: scale(.96) translateY(8px); }
.modal-leave-to   .modal-box { transform: scale(.96) translateY(8px); }

@media (max-width: 480px) {
  .travel-wrap    { padding: 0 1rem 3rem; }
  .spot-grid      { grid-template-columns: 1fr; }
  .modal-info-grid{ grid-template-columns: 1fr; }
  .photo-main     { height: 180px; }
  .photo-thumbs img { width: 56px; height: 42px; }
}
</style>
