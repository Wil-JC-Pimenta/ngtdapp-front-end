import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const backgroundImage = 'https://getwallpapers.com/wallpaper/full/1/6/5/1386335-full-size-amazon-rainforest-wallpaper-1920x1080-download-free.jpg';
const tokenImageUrl = 'https://ngt-pi.vercel.app/my-image.png';

const Container = styled.div`
  text-align: center;
  background: rgba(244, 244, 244, 0.7);
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Arial', sans-serif;
  color: white;
`;

const Title = styled.h1`
  color: #00005;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

const TokenInfo = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 90%;
  max-width: 400px;
`;

const InfoItem = styled.p`
  font-size: 1.25rem;
  margin: 10px 0;
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
  strong {
    color: #fff;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  }
`;

const CryptoList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const DexList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  font-size: 1.2rem;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  margin: 8px 0;
`;

const TokenImage = styled.img`
  width: 150px;
  height: 150px;
  margin: 10px 0;
  border-radius: 10px;
`;

function App() {
  const [tokenData, setTokenData] = useState({
    tokenBalance: 0,
    solanaPrice: 0,
    usdcPrice: 0,
    tokenName: 'Nheengatu',
    tokenSymbol: '',
    bitcoinPrice: 0,
    ethereumPrice: 0,
    bnbPrice: 0,
    usdtPrice: 0,
  });

  const fetchTokenData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/token-data');
      if (!response.ok) {
        throw new Error('Error fetching API data');
      }
      const data = await response.json();
      console.log('Data received from API:', data);

      setTokenData({
        tokenBalance: data.tokenBalance,
        solanaPrice: data.solanaPrice,
        usdcPrice: data.usdcPrice,
        tokenName: tokenData.tokenName, // Mantenha o nome do token
        tokenSymbol: data.tokenSymbol, // Você deve garantir que esse valor é retornado
        bitcoinPrice: data.bitcoinPrice,
        ethereumPrice: data.ethereumPrice,
        bnbPrice: data.bnbPrice,
        usdtPrice: data.usdtPrice,
      });
    } catch (error) {
      console.error('Error fetching token data:', error);
    }
  };

  useEffect(() => {
    fetchTokenData();
  }, []);

  const topCryptos = [
    { name: 'Bitcoin', symbol: 'BTC', price: tokenData.bitcoinPrice },
    { name: 'Ethereum', symbol: 'ETH', price: tokenData.ethereumPrice },
    { name: 'Tether', symbol: 'USDT', price: tokenData.usdtPrice },
    { name: 'USD Coin', symbol: 'USDC', price: tokenData.usdcPrice },
    { name: 'Binance Coin', symbol: 'BNB', price: tokenData.bnbPrice },
    { name: 'Solana', symbol: 'SOL', price: tokenData.solanaPrice },
    { name: 'XRP', symbol: 'XRP', price: 0.5 },
    { name: 'Cardano', symbol: 'ADA', price: 0.3 },
    { name: 'Dogecoin', symbol: 'DOGE', price: 0.06 },
    { name: 'Polkadot', symbol: 'DOT', price: 5.0 },
  ];

  const dexList = ['Serum', 'Raydium', 'Orca', 'PsyOptions', 'Solend'];

  return (
    <Container>
      <Title>Token Data</Title>
      <TokenImage src={tokenImageUrl} alt="Token Image" />
      <TokenInfo>
        <InfoItem><strong>Token Name:</strong> {tokenData.tokenName}</InfoItem>
        <InfoItem><strong>Token Symbol:</strong> {tokenData.tokenSymbol}</InfoItem>
        <InfoItem><strong>Total Balance:</strong> {tokenData.tokenBalance}</InfoItem>
        <InfoItem><strong>SOL Price:</strong> {tokenData.solanaPrice}</InfoItem>
        <InfoItem><strong>USDC Price:</strong> {tokenData.usdcPrice}</InfoItem>
      </TokenInfo>

      <Title>Top Cryptocurrencies</Title>
      <CryptoList>
        {topCryptos.map((crypto, index) => (
          <ListItem key={index}>
            <strong>{crypto.name} ({crypto.symbol}):</strong> ${crypto.price}
          </ListItem>
        ))}
      </CryptoList>

      <Title>Top DEXs on Solana</Title>
      <DexList>
        {dexList.map((dex, index) => (
          <ListItem key={index}>{dex}</ListItem>
        ))}
      </DexList>
    </Container>
  );
}

export default App;
